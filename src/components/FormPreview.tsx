import React, { useState } from 'react'
import { Question } from '../types'
import { Edit, ArrowUp, ArrowDown } from 'lucide-react'

interface FormPreviewProps {
  questions: Question[]
  onEditQuestion: (question: Question) => void
  onMoveQuestion: (index: number, direction: 'up' | 'down') => void
  onValidateForm: (responses: Record<string, string>) => void
}

const FormPreview: React.FC<FormPreviewProps> = ({ questions, onEditQuestion, onMoveQuestion, onValidateForm }) => {
  const [responses, setResponses] = useState<Record<string, string>>({})

  const handleInputChange = (questionId: number, value: string) => {
    setResponses(prev => ({ ...prev, [questionId]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onValidateForm(responses)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {questions.map((question, index) => (
        <div key={question.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Pregunta {index + 1}</h3>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => onMoveQuestion(index, 'up')}
                className="text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={index === 0}
              >
                <ArrowUp size={20} />
              </button>
              <button
                type="button"
                onClick={() => onMoveQuestion(index, 'down')}
                className="text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={index === questions.length - 1}
              >
                <ArrowDown size={20} />
              </button>
              <button
                type="button"
                onClick={() => onEditQuestion(question)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Edit size={20} />
              </button>
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {question.text}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {question.type === 'text' && (
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required={question.required}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
              />
            )}
            {question.type === 'number' && (
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required={question.required}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
              />
            )}
            {question.type === 'date' && (
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required={question.required}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
              />
            )}
            {question.type === 'select' && (
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required={question.required}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
              >
                <option value="">Seleccione una opción</option>
                {question.options?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {question.type === 'switch' && (
              <label className="inline-flex items-center cursor-pointer mt-2">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  required={question.required}
                  onChange={(e) => handleInputChange(question.id, e.target.checked ? 'Sí' : 'No')}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle</span>
              </label>
            )}
            {question.type === 'radio' && (
              <div className="mt-2 space-y-2">
                {question.options?.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      id={`radio-${question.id}-${index}`}
                      type="radio"
                      name={`radio-${question.id}`}
                      value={option}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      required={question.required}
                      onChange={(e) => handleInputChange(question.id, e.target.value)}
                    />
                    <label htmlFor={`radio-${question.id}-${index}`} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}
            {question.type === 'paragraph' && (
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                rows={4}
                required={question.required}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
              ></textarea>
            )}
          </div>
        </div>
      ))}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300"
        >
          Validar Formulario
        </button>
      </div>
    </form>
  )
}

export default FormPreview