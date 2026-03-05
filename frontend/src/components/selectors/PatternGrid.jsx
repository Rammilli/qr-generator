const patterns = new Array(24).fill(0)

export default function PatternGrid() {

  return (

    <div className="grid grid-cols-6 gap-3">

      {patterns.map((_, i) => (

        <div
          key={i}
          className="border rounded-md p-2 cursor-pointer hover:border-blue-500 transition"
        >

          <div className="w-full h-8 bg-gray-300 rounded-sm" />

        </div>

      ))}

    </div>

  )

}