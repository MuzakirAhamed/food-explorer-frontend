import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useData } from "../context/Datacontext";
import Menu from "../Components/Menu";
import Button from "../Components/Button";
import { useUser } from "../context/Usercontext";
import axios from "axios";
export default function DetailsPage() {
  const [searchParams] = useSearchParams();
  const [review, setReview] = useState("");
  const [post, setPost] = useState([]);
  const restaurant = searchParams.get("restaurant");
  const { getRestaurantdetails, restaurantdetails } = useData();
  const { isAuthenticated, username } = useUser();
  useEffect(function () {
    getRestaurantdetails(restaurant);
  }, []);
  const getPost = async () => {
    const res = await axios.get("https://food-explorer-back-end-jz2q.onrender.com/review/");
    setPost(res.data.data);
  };
  useEffect(function () {
    getPost();
  }, []);
  function handleChange(e) {
    setReview(e.target.value);
  }
  function handleAddreview() {
    postReview();
  }
  async function postReview() {
    try {
      const res = await axios.post("https://food-explorer-back-end-jz2q.onrender.com/review/", {
        posts: review,
        username: username,
      });
      if (res.data.message === "Success") {
        toast.success("Posted Review Successfully");
      }
    } catch (error) {
      toast.error("Error occured ");
    }
  }
  return (
    <>
      {restaurantdetails.map((restaurant) => {
        return (
          <React.Fragment key={restaurant._id}>
            <Carousel showThumbs={false}>
              {restaurant.thumb.map((photo, index) => {
                return (
                  <div key={index}>
                    <img
                      className="h-96 w-full"
                      src={`/${photo}`}
                      alt={photo}
                    />
                  </div>
                );
              })}
            </Carousel>
            <h1 className="font-semibold text-3xl">{restaurant.name}</h1>
            <Menu />
            <Tabs>
              <TabList>
                <Tab>Overview</Tab>
                <Tab>Contact</Tab>
                <Tab>Reviews</Tab>
              </TabList>
              <TabPanel>
                <h4>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Aperiam illum hic natus ratione accusantium! Recusandae
                  quibusdam a iure qui sit ea molestiae. Nam.
                </h4>
                <p>
                  Aggregate Rating: <b>{restaurant.aggregate_rating}</b>
                </p>
                <p>Minimum price: {restaurant.min_price}</p>
              </TabPanel>
              <TabPanel>
                <h2>Phone Number</h2>
                <h4 className="text-danger">{restaurant.contact_number}</h4>
                <br />
                <h2 className="font-semibold text-3xl">{restaurant.name}</h2>
                <p>
                  {restaurant.locality}- {restaurant.city}
                </p>
              </TabPanel>
              <TabPanel>
                {!isAuthenticated ? (
                  <p className="text-xl font-semibold">
                    Login your account to post a review
                  </p>
                ) : (
                  <div className="mx-5 my-4 flex flex-col space-y-2">
                    <h2>Post a review</h2>
                    <textarea
                      className=" w-1/2 border border-stone-500 rounded-lg px-2 py-1"
                      value={review}
                      onChange={(e) => handleChange(e)}
                    ></textarea>
                    <div>
                      <Button type="secondary" onClick={handleAddreview}>
                        Post
                      </Button>
                    </div>
                    {post.map((review) => {
                      return (
                        <div key={review._id} className="flex space-x-3">
                          <h1>{review.username}</h1>
                          <p className=" w-96 h-auto bg-blue-300 px-2 py-1 rounded-lg">
                            {review.posts}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </TabPanel>
            </Tabs>
          </React.Fragment>
        );
      })}
    </>
  );
}
