import {supabase} from '../supabase';

export async function getBeats(setter) {
  let {data, error} = await supabase.from('beat').select('*');
  if (error) {
    console.log('[ERROR] GET ALL BEATS: ', error);
    return error;
  }
  console.log('[RES] GET ALL BEATS: ', data);
  setter(data);
  return data;
}

export async function getCollections(setter) {
  let {data, error} = await supabase.from('collection').select('*');
  if (error) {
    console.log('[ERROR] GET ALL COLLECTIONS: ', error);
    return error;
  }
  console.log('[RES] GET ALL COLLECTIONS: ', data);
  setter(data);
  return data;
}

export async function getCollectionBeats(id) {
  let {data, error} = await supabase
    .from('beat')
    .select('*')
    .eq('collection_id', id);
  if (error) {
    console.log('[ERROR] GET COLLECTION BEATS: ', error);
    return error;
  }
  console.log('[RES] GET COLLECTION BEATS: ', data);
  console.log({data});
  return data;
}

/* 

let { data: beat, error } = await supabase
  .from('beat')
  .select(`
    some_column,
    other_table (
      foreign_key
    )
  `)
*/
