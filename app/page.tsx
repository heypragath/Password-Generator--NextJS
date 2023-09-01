"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { Slider } from "@/components/ui/slider"


export default function Home() {

  const Alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const Numbers = "1234567890"
  const SpecialCharacters = "@&#/"

  const [Password, setPassword] = useState("")
  const [Capitalise, setCapitalise] = useState(false)
  const [Number, setNumber] = useState(false)
  const [Char, setChar] = useState(false)
  const [Value, setValue] = useState([1])

  function GenerateCode() {
    let n = Value[0]
    let Intermediate = "";

    const TrueArray = [Capitalise, Number, Char].filter(x => x === true)
    console.log(TrueArray)

    let v = n

    if (n >= 3 && TrueArray.length >= 1) {
      if (n % 2 === 0) {
        v = n / 2
      } else {
        v = (n + 1) / 2
      }
    }

    for (let index = 0; index < v; index++) {
      if (Number) {
        Intermediate += Numbers[Math.floor(Math.random() * 10)]
      }
      if (Char) {
        Intermediate += SpecialCharacters[Math.floor(Math.random() * 4)]
      }
      if (Capitalise) {
        Intermediate += Alphabets[Math.floor(Math.random() * 26)]
      }
      Intermediate += Alphabets[Math.floor(Math.random() * 26)].toLowerCase()
    }
    const FinalNumber = Intermediate.split("").sort(() => Math.random() - 0.5).slice(0, n).join("")
    setPassword(FinalNumber)
  }

  const Data = [
    {
      checked: Capitalise,
      onchange: (data: boolean) => setCapitalise(!data),
      id: "Capitalised Letters",
    },
    {
      checked: Number,
      onchange: (data: boolean) => setNumber(!data),
      id: "Numbers",
    },
    {
      checked: Char,
      onchange: (data: boolean) => setChar(!data),
      id: "Symbols",
    }
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className='w-96 h-96 p-8 flex flex-col justify-center bg-slate-900'>
        <div className="w-full h-11 bg-slate-700 flex items-center justify-center">
          <h1 className="text-3xl  ">{Password}</h1>
        </div>
        <div className="py-5 mb-2">
          <div className="flex justify-between mb-3">
            <p>Character Length</p>
            <p className="text-green-500">{Value}</p>
          </div>
          <Slider value={Value} onValueChange={(e) => setValue(e)} defaultValue={[1]} max={10} step={1} />
        </div>
        <form onSubmit={() => GenerateCode()}>
          <div className='flex flex-col justify-center gap-2'>
            {
              Data.map((data) => {
                return (
                  <div className="flex gap-2 items-center">
                    <Checkbox checked={data.checked} onCheckedChange={(e) => data.onchange(!e)} id={data.id} />
                    <label htmlFor="Capitalise">Include {data.id}</label>
                  </div>
                )
              })
            }
          </div>
          <button className="mt-6 bg-slate-700 text-lg px-5 py-2 w-full" type='submit' onClick={(e) => { e.preventDefault(), GenerateCode() }}> Submit</button>
        </form>
        <div>
        </div>
      </div>
    </main>
  )
}
