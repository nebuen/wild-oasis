import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
//
//
//
//
//
//
//
//
//
//
//
// we added the id so that we know we are in update session
export async function createEditCabin(newCabin, id) {
  // If the image is already uploaded, we don't need to upload it again
  // for that we check if the image starts with the supabase url
  // we us ? to check if the image exists, otherwise it will throw an error
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // Using replaceAll to remove slashes from the image name so that it doesn't break the URL or the supabase storage API will not create a new folder
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //https://rdwcskkcljgetkkoezno.supabase.co/storage/v1/object/public/cabin-images/cabin-008.jpg

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) CREATE w/ array
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  // .from("cabins")
  // .insert([{ ...newCabin, image: imagePath }])
  // .select()
  // .single();

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be created");
  }
  // If the image is already uploaded, we don't need to upload it again
  if (hasImagePath) return data;
  // 2. Upload image

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Cabins image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
//
//
//
//
//
//
//
//
//

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
