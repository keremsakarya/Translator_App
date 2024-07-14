import TranslatorStart from "./Components/TranslatorStart"
import TranslatorApp from "./Components/TranslatorApp"
import { useState } from "react"

const App = () => {

const [showTranslatorApp, setShowTranslatorApp] = useState(false)



  return (
    <div className="w-full h-screen bg-darkBackground flex justify-center items-center">
      <div className="w-[90%] max-w-lg bg-divBackground rounded-xl shadow-custom flex flex-col">
      
      {showTranslatorApp ? (
        <TranslatorApp onClose={() => setShowTranslatorApp(false)} />
      ) : (
      <TranslatorStart onStart ={() => setShowTranslatorApp(true)} />)}
      
      </div>
    </div>
  )
}

export default App