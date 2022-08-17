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
  // TODO: change this logic to happen only when user access collection
  // data.forEach(async coll => {
  //   const beats = await getCollectionBeats(coll);
  //   console.log({beats});
  //   coll.beats = beats;
  // });

  setter(data);
  return data;
}

export async function getCollectionBeats(coll) {
  let {data, error} = await supabase
    .from('beat')
    .select('*')
    .eq('collection_id', coll.id);
  if (error) {
    console.log('[ERROR] GET COLLECTION BEATS: ', error);
    return error;
  }
  console.log('[RES] GET COLLECTION BEATS: ', data);
  console.log({data});
  return data;
}
