import { useState } from "react";
import { vocationalQuestions } from "@/data/vocationalTest";
import { AnimatePresence, motion } from "framer-motion";

const options = [
  { label: "No me pasa", value: 0 },
  { label: "A veces me pasa", value: 1 },
  { label: "Habitualmente me pasa", value: 2 },
  { label: "Siempre me pasa", value: 3 },
];

const getResultMessage = (score: number) => {
  if (score < 35) {
    return "Estás comenzando tu camino de autoconocimiento y reflexión vocacional. Es un buen momento para abrirte a nuevas experiencias, buscar apoyo y explorar tus intereses con libertad.";
  } else if (score <= 70) {
    return "Estás en proceso de descubrimiento. Tenés curiosidad, inquietudes y algunos aspectos definidos, pero todavía podés seguir profundizando tu búsqueda personal y profesional.";
  } else {
    return "Mostrás una actitud activa, reflexiva y comprometida con el futuro. Estás desarrollando una mirada clara sobre lo que te gusta, tus talentos y posibilidades, incluso con una visión emprendedora. Seguí así: estás en un muy buen camino.";
  }
};

export default function VocationalTest() {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(vocationalQuestions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleChange = (index: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.includes(null)) {
      setShowErrorModal(true);
      return;
    }
    setSubmitted(true);
    setShowModal(true);
  };

  const handleReset = () => {
    setAnswers(Array(vocationalQuestions.length).fill(null));
    setSubmitted(false);
    setShowModal(false);
  };

  const totalScore = answers.reduce((acc: number, val) => acc + (val ?? 0), 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Test Vocacional</h1>

      <form className="space-y-6">
        {vocationalQuestions.map((question, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <p className="mb-4 font-medium">{index + 1}. {question}</p>
            <div className="flex flex-col sm:flex-row gap-2">
              {options.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={opt.value}
                    checked={answers[index] === opt.value}
                    onChange={() => handleChange(index, opt.value)}
                    className="accent-blue-600"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Ver resultado
        </button>
      </form>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="m-5 bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold mb-4 text-center">Resultado</h2>
              <p className="text-lg mb-2 text-center">Puntaje total: <span className="font-bold">{totalScore}</span></p>
              <p className="mb-6 text-center">{getResultMessage(totalScore)}</p>
              <div className="flex justify-center">
                <button
                  onClick={handleReset}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Reiniciar test
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showErrorModal && (
          <motion.div
            className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowErrorModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="m-5 bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => setShowErrorModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold mb-4 text-center">¡Atención!</h2>
              <p className="text-center">Por favor, responde todas las preguntas antes de continuar.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
