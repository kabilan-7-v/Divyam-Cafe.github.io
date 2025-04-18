import axios from "axios";
import React, { useState, useEffect } from "react";
import "@fontsource/gloock";
import Feedbackcard from "../Compounds/Feedbackcard";
import Footbar from "../Compounds/Footbar";
import Navbar from "../Compounds/Navbar";
import { Link } from "react-router-dom";
import RotatingImage1 from "../Compounds/Rotatingimage1";

function FeedbackPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch feedback data
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(
        "https://divyamcafe-backend-39ny.onrender.com/api/getallfeedback"
      );

      // Filter only entries where isbutton is true
      const filteredFeedbacks = response.data.feedbacks.filter(
        (item) => item.isbutton == true
      );

      setTestimonials(filteredFeedbacks);
      console.log(filteredFeedbacks);
      setLoading(false);
    } catch (err) {
      setError("Failed to load feedbacks");
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="flex flex-col h-full w-screen bg-white">
      <Navbar />
      <h5 className="md:text-[250%] text-[22px] text-[#603913] font-[gloock] text-center mt-27 items-center">
        Some of Our Happy Customers
      </h5>
      <div className="flex items-center justify-center">
        <div className="h-0.5 mt-2 md:w-60 w-40 bg-[#603913]"></div>
      </div>
      <div className="flex justify-end md:mt-0 mt-4">
        <Link to={"/addreview"}>
          <div className="bg-amber-900 md:mr-16  mr-4 rounded-xl">
            <h5 className="text-white md:text-[24px] text-[16px] font-bold text-center p-4">
              + Add Review
            </h5>
          </div>
        </Link>
      </div>

      {loading ? (
           <div className="h-150">
         
           <RotatingImage1 />
           <p className="text-center text-black text-4xl mt-5">Loading...</p>
 
           
         </div>
        // <div className="h-100">
        //   {" "}
        //   <p className="text-center text-black text-4xl mt-25">Loading...</p>
        // </div>
      ) : testimonials.length === 0 ? (
        <div className="h-100 flex flex-col justify-center items-center">
          {" "}
          <h1 className="text-black text-2xl text-center mt-5">
            NO Review FOUND
          </h1>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {testimonials.map((item, index) => (
            <div key={item._id || index} className="mt-5 flex-basis-[18%]">
              <Feedbackcard
                index={index}
                author={item.name}
                quote={item.feedback}
                rating={item.rating}
              />
            </div>
          ))}
        </div>
      )}

      <div className="md:h-35 h-4"></div>
      <Footbar />
    </div>
  );
}

export default FeedbackPage;
