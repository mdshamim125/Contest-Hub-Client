// import React from "react";
// import { useParams } from "react-router-dom";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";

// const PopularDetails = () => {
//   const { id } = useParams();
//   const axiosPublic = useAxiosPublic();
//   const { data: popular = {}, isLoading } = useQuery({
//     queryKey: ["popular", id],
//     queryFn: async () => {
//       const { data } = await axiosPublic.get(`/popular/${id}`);
//       return data;
//     },
//   });

//   if (isLoading) return <p>loading...</p>;
//   return (
//     <div>
//       <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
//         Contest Details
//       </h2>
//       <div className="mt-8 max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
//         <div className="p-6">
//           <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
//             {popular.name}
//           </h3>
//           <img
//             className="mt-4 w-full h-auto"
//             src={popular.image}
//             alt={popular.name}
//           />
//           <p className="mt-4 text-gray-600 dark:text-gray-400">
//             Participants: {popular.attemptedCount}
//           </p>
//           <p className="mt-4 text-gray-600 dark:text-gray-400">
//             Description: {popular.shortDescription}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PopularDetails;
