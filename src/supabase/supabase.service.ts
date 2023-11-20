import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { FileDto } from './dto/file.dto';

const supabaseURL = process.env.SUPABASE_URL;
const supabaseKEY = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseURL, supabaseKEY, {
  auth: {
    persistSession: false,
  },
});

@Injectable()
export class SupabaseService {
  async upload(bucket: string, file: FileDto) {
    const data = await supabase.storage
      .from(bucket)
      .upload(file.originalname, file.buffer, {
        upsert: true,
      });

    return data;
  }

  async remove(bucket: string, fileName: string) {
    const result = await supabase.storage.from(bucket).remove([`${fileName}`]);

    return result;
  }
}
