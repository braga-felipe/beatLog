import { supabase } from '../supabase';

/* POST */
export async function postBeat(beat) {
  const { name, taps } = beat;
  const { data, error } = await supabase.from('beat').insert([{ name: name }]);
  if (error) {
    console.log('POST ERROR: ', { error });
    return error;
  }
  await postTaps(taps, data[0].id);
  return data;
}

export async function postTaps(taps, beatId) {
  taps.forEach(async (tap, index) => {
    const { diff } = tap;
    const { data, error } = await supabase
      .from('tap')
      .insert([{ name: `tap-${index}`, diff, beat_id: beatId }]);
    if (error) {
      console.log('POST ERROR: ', { error });
    }
  });
  console.log('ALL BEATS POSTED');
}

/* GET */
export async function getBeats(setter) {
  let { data, error } = await supabase.from('beat').select('*');
  if (error) {
    return error;
  }
  setter(data);
  return data;
}

export async function getCollections(setter) {
  let { data, error } = await supabase.from('collection').select('*');
  if (error) {
    return error;
  }
  setter(data);
  return data;
}

export async function getCollectionBeats(coll) {
  let { data, error } = await supabase
    .from('beat')
    .select('*')
    .eq('collection_id', coll.id);
  if (error) {
    return error;
  }
  return data;
}

export async function getBeatTaps(beat) {
  let { data, error } = await supabase
    .from('tap')
    .select('*')
    .eq('beat_id', beat.id);
  if (error) {
    console.log('ERROR GET TAPS', { error });
    return 'ERROR FETCHING TAPS';
  }
  return data;
}

/* UPDATE */

export async function updateTap(tap) {
  const { data, error } = await supabase
    .from('tap')
    .update({ ...tap })
    .eq('id', tap.id);

  if (error) {
    console.log('ERROR UPDATE TAP', { error });
    return 'ERROR UPDATING TAP';
  }
  return `[TAP] SUCCESSFUL UPDATE: ${data}`;
}
