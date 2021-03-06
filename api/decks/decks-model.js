const db = require('../data/db-config');

const formatDecks = (rows) => {
  if (!rows){
    return rows;
  } 

  const uniqueDeckIds = new Set();

  let decks = [];

  rows.forEach(row => {
    if(!uniqueDeckIds.has(row.deck_id)){
      
      decks.push({
        deck_id: row.deck_id,
        deck_name: row.deck_name,
        deck_color: row.deck_color,
        deck_description: row.deck_description,
        
        user_id: row.user_id
      });
      
      uniqueDeckIds.add(row.deck_id);
    }
  });

  decks.forEach(deck => {

    let cards = rows.filter(row => {
      return row.deck_id === deck.deck_id
    }).map(row => {
      return row.card_id &&  {
        card_id: row.card_id,
        stack_order: row.card_stack_order,

        panel_a: {
          text: row.panel_a_text,
          notes: row.panel_a_notes
        },
        panel_b: {
          text: row.panel_b_text,
          notes: row.panel_b_notes
        },
      }
    });

    cards = cards.filter(card => card !== null);

    cards.sort(function(a, b){ return a.stack_order - b.stack_order });
    
    deck.cards = cards;
    
  
  });

  return decks;
};

const query = async (filter) => {
  let decks;

  await db.transaction(async trx => {
    
    if (filter.user_id){
      decks = await trx('decks as d')
      .leftJoin('cards as c', 'c.deck_id', 'd.deck_id')
      .where({ user_id: filter.user_id })
      .select(
        'd.*',

        'c.card_id',
        'c.card_stack_order',

        'c.panel_a_text',
        'c.panel_a_notes',
        
        'c.panel_b_text',
        'c.panel_b_notes',
      );

    } else {
      decks = await trx('decks as d')
      .leftJoin('cards as c', 'c.deck_id', 'd.deck_id')
      .select(
        'd.*',
        
        'c.card_id',
        'c.card_stack_order',

        'c.panel_a_text',
        'c.panel_a_notes',
        
        'c.panel_b_text',
        'c.panel_b_notes',
      );
    }

  });

  return formatDecks(decks);
}

const findById = async (deck_id) => {
  
  const deck = await db('decks as d')
  .leftJoin('cards as c', 'c.deck_id', 'd.deck_id')
  .select(
    'd.*',
    
    'c.card_id',
    'c.card_stack_order',

    'c.panel_a_text',
    'c.panel_a_notes',
    
    'c.panel_b_text',
    'c.panel_b_notes',
  )
  .where('d.deck_id', deck_id)
  
  return formatDecks(deck);
};

const create = async ({ deck_name, deck_color, deck_description = null, user_id }) => {

  const [ deck ] = await db('decks as d')
    .insert({
      deck_name,
      deck_color,
      deck_description,
      user_id: Number(user_id)
    },
    ['d.deck_id']
  );

  return findById(deck.deck_id);
}

const deleteById = async (deck_id) => {

  const deletedDeck = await findById(deck_id);

  await db.transaction(async trx => {
    const cards = await trx('cards as c').where({ deck_id });
    
    if(cards.length > 0){
      await trx('cards as c').where({ deck_id }).delete();
    }
    
  });

  await db('decks as d').where({ deck_id }).delete();

  return deletedDeck;

}

module.exports = {
  query,
  findById,
  create,
  deleteById
}