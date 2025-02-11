import connection from "../connection.js";
import customError from "../classes/customError.js";

export const addReview = async (req, res, next) => {
    try {
        const { user_id, review_text, rating, stay_date, num_days } = req.body;
        const { propertyId } = req.params;
    
        // Verifica che tutti i campi obbligatori siano presenti
        if (!user_id || !review_text || !rating || !stay_date || !num_days) {
          return next(new customError(400, "Tutti i campi sono obbligatori."));
        }
    
        if (rating < 1 || rating > 5) {
          return next(new customError(400, "La valutazione deve essere compresa tra 1 e 5."));
        }
    
        // Verifica che la proprietà esista
        const propertyQuery = 'SELECT * FROM properties WHERE id = ?';
        const [propertyRows] = await connection.execute(propertyQuery, [propertyId]);
    
        if (propertyRows.length === 0) {
          return next(new customError(404, 'Proprietà non trovata'));
        }
    
        // Inserimento recensione nel database
        const reviewQuery = `
          INSERT INTO reviews (property_id, user_id, review_text, rating, stay_date, num_days)
          VALUES (?, ?, ?, ?, ?, ?)
        `;
    
        await connection.execute(reviewQuery, [
          propertyId,
          user_id,
          review_text,
          rating,
          stay_date,
          num_days,
        ]);
    
        res.status(201).json({ message: 'Recensione inviata con successo!' });
      } catch (error) {
        console.error("Errore nell'aggiungere la recensione:", error);
        next(new customError(500, "Errore del server"));
      }
};

export const getReviews = async (req, res, next) => {
    try{
        const { propertyId } = req.params;
        const query = 'SELECT * FROM reviews WHERE property_id = ? ORDER BY created_at DESC';
        const [rows] = await connection.execute(query, [propertyId]);
        res.status(200).json({ reviews: rows }); 
    }
    catch (error) {
        console.error("Errore nel recupero delle recensioni:", error);
        next(new customError(500, "Errore del server"));
    }
};