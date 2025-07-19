export default function CircleCard({ image, name, specific }: Readonly<CircleCardType>) {
  return (
    <div className=" flex  flex-col gap-y-4 items-center  justify-center">
      <div className=" border-dashed border-2 rounded-full  p-0.5 border-white">
        <img className=" size-64   border-dashed rounded-full" src={image} alt="item" />
      </div>
      <h3 className=" font-bold text-2xl ">{name}</h3>
      <p className=" text-gray-300 text-lg">{specific}</p>
    </div>
  )
}
