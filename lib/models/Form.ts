import mongoose, { Document, Schema } from 'mongoose';

export interface Form extends Document {
  title: string;
  description?: string;
  questions: {
    type: 'Short Answer' | 'Long Answer' | 'Single Select' | 'Number' | 'URL';
    text: string;
    options?: string[];
  }[];
}

const FormSchema = new Schema<Form>({
  title: { type: String, required: true },
  description: { type: String },
  questions: {
    type: [
      {
        type: { type: String, enum: ['Short Answer', 'Long Answer', 'Single Select', 'Number', 'URL'], required: true },
        text: { type: String, required: true },
        options: { type: [String], default: [] },
      },
    ],
    required: true,
    default: [],
  },
}, { timestamps: true });

const FormModel = mongoose.models.Form || mongoose.model<Form>('Form', FormSchema);

export default FormModel;