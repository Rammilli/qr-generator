const logos = new Array(24).fill(0)

export default function LogoGrid(){

  return(

    <div className="grid grid-cols-8 gap-2">

      {logos.map((_,i)=>(
        <div
          key={i}
          className="border rounded-md p-2 hover:border-primary cursor-pointer"
        >
          <div className="w-6 h-6 bg-gray-300 rounded"/>
        </div>
      ))}

    </div>

  )
}