const TranslatorStart = ({onStart}) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-12">
        <div className="w-full h-64 bg-turquoise rounded-t-full rounded-bl-full flex flex-col justify-center text-darkBackground pr-6">
            <span className="font-shojumaru text-6xl text-center">Hello</span>
            <span className="text-3xl text-center">Merhaba</span>
            <span className="text-2xl text-center">Привет</span>
            <span className="font-notoSansJp text-4xl text-right">こんにちは</span>
            <span className="text-2xl text-right">Bonjour</span>
        </div>
        <div className="w-full text-right space-y-5 mt-20 mb-36">
            <h1 className="font-righteous text-4xl text-hColor uppercase">Translator App</h1>
            <button className="w-32 h-10 bg-turquoise rounded-full font-righteous font-bold text-lg uppercase text-darkBackground tracking-widest active:translate-y-[1px]" onClick={onStart}>Start</button>
        </div>
    </div>
  )
}

export default TranslatorStart