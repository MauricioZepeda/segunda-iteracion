import React, { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import QuestionForm from './components/QuestionForm'
import FormPreview from './components/FormPreview'
import Modal from './components/Modal'
import { Question } from './types'

function App() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false)
  const [responses, setResponses] = useState<Record<string, string>>({})

  const addQuestion = (question: Question) => {
    if (editingQuestion) {
      setQuestions(questions.map(q => q.id === editingQuestion.id ? question : q))
    } else {
      setQuestions([...questions, question])
    }
    closeModal()
  }

  const startEditing = (question: Question) => {
    setEditingQuestion(question)
    setIsModalOpen(true)
  }

  const openModal = () => {
    setEditingQuestion(null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setEditingQuestion(null)
    setIsModalOpen(false)
  }

  const moveQuestion = (index: number, direction: 'up' | 'down') => {
    const newQuestions = [...questions]
    const newIndex = direction === 'up' ? index - 1 : index + 1

    if (newIndex >= 0 && newIndex < questions.length) {
      [newQuestions[index], newQuestions[newIndex]] = [newQuestions[newIndex], newQuestions[index]]
      setQuestions(newQuestions)
    }
  }

  const handleValidateForm = (formResponses: Record<string, string>) => {
    setResponses(formResponses)
    setIsResponseModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Generador de Formularios Dinámicos</h1>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-blue-50 border-b border-blue-100">
          <button
            className="flex items-center justify-center w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 font-medium text-lg"
            onClick={openModal}
          >
            <PlusCircle className="mr-2" size={24} />
            Agregar Nueva Pregunta
          </button>
        </div>
        {questions.length > 0 && (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Vista Previa del Formulario</h2>
            <FormPreview 
              questions={questions} 
              onEditQuestion={startEditing}
              onMoveQuestion={moveQuestion}
              onValidateForm={handleValidateForm}
            />
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingQuestion ? 'Editar Pregunta' : 'Agregar Pregunta'}
      >
        <QuestionForm 
          onAddQuestion={addQuestion} 
          editingQuestion={editingQuestion}
          onCancelEdit={closeModal}
        />
      </Modal>
      <Modal
        isOpen={isResponseModalOpen}
        onClose={() => setIsResponseModalOpen(false)}
        title="Respuestas del Formulario"
      >
        <div className="space-y-4">
          {questions.sort((a, b) => a.id - b.id).map(question => {
            const response = responses[question.id.toString()]
            return (
              <div key={question.id} className="border-b pb-2">
                <p className="font-semibold">{question.text}</p>
                <p>{response || 'Sin respuesta'}</p>
              </div>
            )
          })}
        </div>
      </Modal>
    </div>
  )
}

export default App