import React, { useEffect, useState } from "react";
import profile from "../../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

const cloud_name = import.meta.env.VITE_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;

const Update = () => {
  useRedirectLoggedOutUser("/login");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user } = useSelector((state) => state.auth);

  // Initialize userData once
  const [userData, setUserData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    photo: user?.photo || "",
    role: user?.role || "",
    isVerified: user?.isVerified || false,
  });

  const [userImage, setUserImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    } else {
      // Set userData when user data is fetched
      setUserData((prevState) => ({
        ...prevState,
        username: user.username,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        photo: user.photo,
        role: user.role,
        isVerified: user.isVerified,
      }));
    }
  }, [user, dispatch]);

  const handleImageChange = (e) => {
    setUserImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let imageUrl;

    try {
      if (
        userImage !== null &&
        (userImage.type === "image/jpeg" ||
          userImage.type === "image/jpg" ||
          userImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", userImage);
        image.append("cloud_name", cloud_name);
        image.append("upload_preset", upload_preset);

        // Save image to cloudinary
        console.log(userImage)
        console.log(upload_preset)
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          { method: "post", body: image }
        );
        console.log(await response.json())
        const imgData = await response.json();
        imageUrl = imgData.url.toString();
      }

      // Save profile to MongoDB
      const updatedData = {
        username: userData.username,
        phone: userData.phone,
        bio: userData.bio,
        photo: userImage ? imageUrl : userData.photo,
      };

      // Assuming you have an updateUser action
      await dispatch(updateUser(updatedData));
      navigate("/profile")
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-black text-white shadow-3xlgreen outline-[#2b9962] rounded-lg w-[600px] p-6">
        {isLoading ? (
          <div className="flex text-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="text-left">
            <form onSubmit={handleUpdate}>
              <div className="mb-4 flex justify-center">
                <label htmlFor="image" className="cursor-pointer">
                  <img
                    src={imagePreview === null ? userData.photo : imagePreview}
                    alt="Profile"
                    className="h-[130px] bg-cover rounded-full w-[130px] shadow-2xl bg-center"
                  />
                </label>
                <input
                  type="file"
                  className="mt-3 hidden"
                  accept="image/*"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                />
              </div>
              <div className="relative mb-6">
                <label className="block text-white font-medium mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  className="bg-transparent text-white text-left w-full px-4 py-3 rounded-lg border outline-none"
                />
              </div>

              <div className="relative mb-6">
                <label className="block text-white font-medium mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={userData.bio}
                  onChange={handleInputChange}
                  className="bg-transparent text-white text-left w-full px-4 py-3 rounded-lg border outline-none"
                />
              </div>
              <div className="relative mb-6">
                <label className="block text-white font-medium mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  className="bg-transparent text-white text-left w-full px-4 py-3 rounded-lg border outline-none"
                />
              </div>

              <div className="flex justify-between">
                <Link
                  to={"/profile"}
                  className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
                >
                  My Profile
                </Link>


                {isLoading ? (
                <button
                  id="submit-button"
                  disabled
                  className="!bg-[#b3f3d3] text-white py-2 px-6 rounded-lg hover:bg-green-700"
                >
                  <Loader />
                </button>
              ) : (
                <button
                type="submit"
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
              >
                Update
              </button>
              )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Update;