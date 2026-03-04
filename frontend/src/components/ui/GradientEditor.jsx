export default function GradientEditor(){

  return(

    <div className="space-y-3">

      <div>
        <label className="text-xs">Start Color</label>
        <input type="color"/>
      </div>

      <div>
        <label className="text-xs">End Color</label>
        <input type="color"/>
      </div>

    </div>

  )
}