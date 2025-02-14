'use client'
import { error } from 'console'
import React,{useState} from 'react'



export default function CurrenterConverter() {
    const [amount,setAmount]= useState<string>("")
    const [tocurrent,setToCurrent]= useState("EUR")
    const [fromcurrent,setFromCurrent]= useState("USD")
    const [result,setResult]= useState<number | null>(null)
    const [isloading,setIsloading]= useState(false)
    const currenties = [
        {code:"USD",name:"Dollar"},
        {code:"EUR",name:"Euro"},
        {code:"GBP",name:"Pound"},
        {code:"INR",name:"Rupee"},
        {code:"JPY",name:"Yen"},
    ]
    const handleConvert = async ()=> {
        if(!amount)return 
        setIsloading(true)
       try {
        if(!process.env.NEXT_PUBLIC_API_KEY)
            throw new Error("Api key is not set")
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_API_KEY}/latest/${fromcurrent}`)
        if(!response)
            throw new Error("Failed to fetch data")
        const data = await response.json()
        const rate = data.conversion_rates[tocurrent]
        const result = rate * Number(amount)
        console.log('result',result)
        if(!result)
            throw new Error("Failed to fetch data")
        setResult(result)
       } catch (error) {
        console.error("error converting currenty",error)
        
       }
       setIsloading(false)
    }
    const availableCurrencies = currenties.filter(currency => currency.code !== fromcurrent)
    const onChangeFromCurrency = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setFromCurrent(e.target.value)
        if(e.target.value === tocurrent){
            const firstAvailable = currenties.find(c=>c.code === e.target.value)
            if(firstAvailable)
                setToCurrent(e.target.value)
        }
        }
  return (
    <div className=''>
        <label className='block text-sm text-gray-700 mb-1' htmlFor="montant">Montant</label>
        <input placeholder='Entrer le montant a Convertir' onChange={(e)=>setAmount(e.target.value)} className='w-full p-2 border rounded-md' type="number" id="montant" name="montant"/>
        <div className='grid grid-cols-2'>
            <div>
                <label className='block text-sm text-gray-700' htmlFor="from">De</label>
                <select onChange={onChangeFromCurrency} name="" id="from" className='w-full border-rounded-md p-2' value={fromcurrent}>
                    {currenties.map((currentie, index) => (
                        <option key={index} value={currentie.code}>{currentie.name}</option>
                        ))}
                </select>
            </div>
            <div>
                <label className='block text-sm text-gray-700' htmlFor="to">vers</label>
                <select onChange={(e)=>setToCurrent(e.target.value)} name="" id="to" className='w-full p-2 border-rounded-md' value={tocurrent}>
                    {availableCurrencies.map((currentie, index) => (
                        <option key={index} value={currentie.code}>{currentie.name}</option>
                        ))}
                </select>
            </div>
        </div>
        <button onClick={()=>handleConvert()} className='w-full mt-2 bg-slate-700 text-white py-2 rounded-md hover:bg-slate-600'> {isloading?"Convertion en cours ...":"Convertir"}</button>

       { result && (<div className='mt-4 p-4 bg-green-100 rounded-md'>
            <p className='text-center text-lg'>
                {amount} {fromcurrent} = {result} {tocurrent}
                </p>
        </div>)
        }
    </div>
  )
}
