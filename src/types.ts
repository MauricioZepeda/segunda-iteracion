export interface Question {
  id: number
  text: string
  type: 'text' | 'number' | 'date' | 'select' | 'switch' | 'radio' | 'paragraph'
  options?: string[]
  required: boolean
}