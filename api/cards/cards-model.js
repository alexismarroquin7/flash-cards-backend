const db = require('../data/db-config');

function formatCards(rows){
  if(!rows){
    return rows;
  }

  if(Array.isArray(rows)){
    const cards = rows.map(card => {
      return {
        deck_id: card.deck_id,
        card_id: card.card_id,
        stack_order: card.card_stack_order,
        
        panel_a: {
          text: card.panel_a_text,
          notes: card.panel_a_notes
        },
        
        panel_b: {
          text: card.panel_b_text,
          notes: card.panel_b_notes
        }
      }
    });

    return cards;
  } else {
    return {
      deck_id: rows.deck_id,
      card_id: rows.card_id,
      stack_order: rows.card_stack_order,
        
      panel_a: {
        text: rows.panel_a_text,
        notes: rows.panel_a_notes
      },
      
      panel_b: {
        text: rows.panel_b_text,
        notes: rows.panel_b_notes
      }
    }
  }
}

const findAll = async ({
  deck_id = null,
  sort = 'asc'
}) => {
  
  let cards;

  if(deck_id){
    cards = await db('cards as c')
    .where({ deck_id })
    .orderBy('c.card_stack_order', sort);
    
  } else {
    cards = await db('cards as c')
    .orderBy('c.card_stack_order', sort);

  }

  return formatCards(cards);
};

const findById = async card_id => {
  const card = await db('cards as c').where({ card_id }).first();

  return formatCards(card);
};

const create = async ({
  deck_id,
  panel_a = {
    text: null,
    notes: null
  },
  panel_b = {
    text: null,
    notes: null
  }
}) => {

  const cardListInDeck = await db('cards as c')
  .where({ deck_id });

  const [ card ] = await db('cards as c')
  .insert({
    deck_id,

    card_stack_order: cardListInDeck.length + 1,

    panel_a_text: panel_a.text,
    panel_a_notes: panel_a.notes,

    panel_b_text: panel_b.text,
    panel_b_notes: panel_b.notes
  }, ['c.*']);

  return formatCards(card);
}

const deleteById = async (card_id) => {
  const cardToDelete = await findById(card_id);
  
  await db.transaction(async trx => {
    const relatedCards = await trx('cards as c')
    .where({ deck_id: cardToDelete.deck_id })
    .where('c.card_stack_order', '>', cardToDelete.stack_order);

    if(relatedCards.length > 0){
      await trx('cards as c')
      .where({ deck_id: cardToDelete.deck_id })
      .where('c.card_stack_order', '>', cardToDelete.stack_order)
      .decrement('card_stack_order', 1);
    }

  });
  
  await db('cards as c').where({ card_id }).delete();
  return formatCards(cardToDelete);

}

module.exports = {
  findAll,
  findById,
  create,
  deleteById
}