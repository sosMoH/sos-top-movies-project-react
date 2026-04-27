import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);


export const updateSearchCount = async (searchTerm:any, movie:any) => {
  try {
    // 1- Check if search term exists in Supabase
    const { data: existingSearch, error: fetchError } = await supabase
      .from('search_metrics')
      .select('*')
      .eq('searchTerm', searchTerm)
      .maybeSingle(); // Returns null instead of an error if no row is found

    if (fetchError) throw fetchError;

    // 2- If it does, update count
    if (existingSearch) {
      const { error: updateError } = await supabase
        .from('search_metrics')
        .update({ count: existingSearch.count + 1 })
        .eq('id', existingSearch.id);
        
      if (updateError) throw updateError;

    // 3- If it doesn't, create new row
    } else {
      const { error: insertError } = await supabase
        .from('search_metrics')
        .insert([{
          searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        }]);

      if (insertError) throw insertError;
    }
  } catch (error) {
    console.error('Error updating search count in Supabase:', error);
  }
}

export const getTrendingMovies = async () => {
  try {
    const { data, error } = await supabase
      .from('search_metrics')
      .select('*')
      .order('count', { ascending: false })
      .limit(5);

    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching trending movies from Supabase:', error);
    return [];
  }
}