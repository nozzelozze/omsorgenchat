


const Watermark = () =>
{
    return (
        <div className="w-28 h-28 flex flex-col items-center absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img src="/icon.png" alt="Watermark Icon" className="rounded-full w-24 h-24"></img>
            <div className="mt-2 text-2xl font-semibold whitespace-nowrap">Vad behöver du hjälp med?</div>
        </div>
    )
}

export default Watermark