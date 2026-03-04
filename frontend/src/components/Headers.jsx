export default function Header(){

return(

<header className="bg-slate-800 text-white px-8 py-4 flex justify-between items-center">

<h1 className="text-xl font-bold">
QR Generator
</h1>

<div className="flex gap-6 text-sm">

<span>Solutions</span>
<span>Features</span>
<span>Resources</span>
<span>Pricing</span>

</div>

<div className="flex gap-3">

<button className="border px-3 py-1 rounded">
Login
</button>

<button className="bg-blue-500 px-3 py-1 rounded">
Register
</button>

</div>

</header>

)

}