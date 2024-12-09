import mongoose, { Document, Schema } from 'mongoose';

export interface Form extends Document {
  title: string;
  description?: string;
  questions: {
    type: 'Short Answer' | 'Long Answer' | 'Single Select' | 'Number' | 'URL' | 'Date';
    text: string;
    subtext?: string;
    options?: string[];
  }[];
}

const FormSchema = new Schema<Form>({
  title: String,
  description: String,
  questions: {
    type: [
      {
        type: { type: String, enum: ['Short Answer', 'Long Answer', 'Single Select', 'Number', 'URL', 'Date'], required: true },
        text: { type: String, required: true },
        subtext: { type: String, default: '' },
        options: { type: [String], default: [] },
      },
    ],
    required: true,
    default: [],
  },
}, { timestamps: true });

const FormModel = mongoose.models.Form || mongoose.model<Form>('Form', FormSchema);

export default FormModel;