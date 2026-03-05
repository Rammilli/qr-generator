const templates = [
  "template1",
  "template2",
  "template3",
  "template4",
  "template5",
  "template6"
]

export default function TemplateGrid(){

  return(

    <div className="grid grid-cols-4 gap-3">

      {templates.map((t)=>(
        <div
          key={t}
          className="border rounded-lg overflow-hidden hover:border-blue-500 cursor-pointer"
        >

          <img
            src={`/templates/${t}.png`}
            className="w-full h-20 object-cover"
          />

        </div>
      ))}

    </div>

  )

}