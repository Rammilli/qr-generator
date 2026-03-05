const styles = [
  "square",
  "rounded",
  "circle",
  "diamond",
  "leaf",
  "star"
]

export default function EyeStyles(){

  return(

    <div className="grid grid-cols-6 gap-3">

      {styles.map((style)=>(
        <div
          key={style}
          className="border rounded p-2 hover:border-blue-500 cursor-pointer"
        >

          <div className="w-full h-8 bg-gray-300 rounded"/>

        </div>
      ))}

    </div>

  )

}