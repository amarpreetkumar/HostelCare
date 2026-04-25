function SkeletonCard() {

 return (

<div className="bg-white shadow-md rounded-xl p-5 animate-pulse">

<div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>

<div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
<div className="h-3 bg-gray-300 rounded w-5/6 mb-2"></div>

<div className="h-6 bg-gray-300 rounded w-20 mt-4"></div>

</div>

 );

}

export default SkeletonCard;