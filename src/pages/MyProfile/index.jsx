import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "react-pro-sidebar";

import { Button, Img, Text } from "components";

const MyProfilePage = () => {
  const navigate = useNavigate();



  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null); // To store the selected photo
  const [currentpassword, setCurrentpassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  let token = localStorage.getItem("token");

  let namee=localStorage.getItem("username")
  let emaill=localStorage.getItem("email")

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto); // Store the selected photo in state

    if (selectedPhoto) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const dataURL = event.target.result; // Get the data URL of the selected image
        // Update the Img component's src attribute with the data URL
        // This will display the selected image
        document.querySelector("#profile-img").src = dataURL;
      };

      reader.readAsDataURL(selectedPhoto);
    }
  };

  const handleUpdateFields = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (name) formData.append("name", name);
    if (email) formData.append("email", email);
    if (photo) formData.append("photo", photo);

    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/v1/users/updateMe",
        {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("Updated Successfully")
        console.log("User profile updated:", data);
      } else {
        console.error("Error updating user profile:", response.statusText);
      }

      setName("");
      setEmail("");
     
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleUpdatePassword = () => {
    const updateData = {
      passwordCurrent: currentpassword,
      password: password,
      passwordConfirm: confirmpassword,
    };

    fetch("http://127.0.0.1:3000/api/v1/users/updateMyPassword", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Password Updated Successfully");
          navigate("/dashboard");
        } else {
          throw new Error("Password update failed");
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <>
      <div className="bg-white-A700 flex flex-col font-poppins items-center justify-start mx-auto w-full">
        <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mx-auto md:px-5 w-full">
          <div className="h-[1024px] relative w-[22%] md:w-full">
            <Sidebar className="!sticky !w-[299px] border border-black-900 border-solid flex h-screen md:hidden justify-start m-auto overflow-auto top-[0]"></Sidebar>
            <div className="absolute flex flex-col inset-x-[0] justify-start mx-auto top-[6%] w-[45%]">
              <Text
                className="text-[22px] text-center text-indigo-800 sm:text-lg md:text-xl"
                size="txtPoppinsBold22"
                onClick={() => navigate("/dashboard")}
              >
                ProjectFlow
              </Text>
              <Text
                className="ml-7 md:ml-[0] mt-[102px] text-base text-indigo-800 tracking-[0.44px]"
                size="txtPoppinsRegular16"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Text>
              <div className="flex flex-col gap-[46px] items-start justify-start md:ml-[0] ml-[35px] mt-[47px]">
                <Text
                  className="md:ml-[0] ml-[3px] text-base text-indigo-800 tracking-[0.44px]"
                  size="txtPoppinsRegular16"
                  onClick={() => navigate("/myprojects")}
                >
                  Projects
                </Text>
                <Text
                  className="text-base text-indigo-800 tracking-[0.44px]"
                  size="txtPoppinsRegular16"
                  onClick={() => navigate("/mytasks")}
                >
                  My Tasks
                </Text>
                <Text
                  className="md:ml-[0] ml-[9px] text-base text-indigo-800 tracking-[0.44px]"
                  size="txtPoppinsRegular16"
                  onClick={() => navigate("/apps")}
                >
                  Apps
                </Text>
              </div>
            </div>
          </div>
          <div className="flex md:flex-1 flex-col md:gap-10 gap-[105px] justify-start md:mt-0 mt-[68px] w-[74%] md:w-full">
            <Text
              className="md:ml-[0] ml-[844px] text-base text-indigo-800 tracking-[0.44px]"
              size="txtPoppinsRegular16"
              onClick={() => navigate("/myprofile")}
            >
              My Profile
            </Text>
            <div className="flex flex-col gap-4 items-start justify-start w-full">
              <Text
                className="sm:text-3xl md:text-[32px] text-[34px] text-center text-indigo-800"
                size="txtPoppinsBold34"
              >
                My Profile
              </Text>
              <div className="bg-gray-50 flex flex-col items-center justify-start p-[22px] sm:px-5 rounded-[30px] w-full">
                <div className="flex flex-col justify-start mb-1.5 w-[90%] md:w-full">
                  <div className="flex md:flex-col flex-row md:gap-5 items-end justify-start w-[99%] md:w-full">
                    <Text
                      className="mb-[11px] md:mt-0 mt-[84px] text-base text-indigo-800 tracking-[0.44px]"
                      size="txtPoppinsRegular16"
                    >
                      Name
                    </Text>
                    <input
                      type="text"
                      className="bg-white-A700 border border-blue_gray-100 border-solid h-12 md:ml-[0] ml-[102px] md:mt-0 mt-[72px] rounded-[12px] w-[43%]"
                      value={name}
                      placeholder={namee}
                      onChange={handleNameChange}
                    />
                    <Img
                      id="profile-img"
                      className="h-28 sm:h-auto mb-2 md:ml-[0] ml-[229px] object-cover w-[15%] md:w-full"
                      src={photo ? "" : "images/img_image12.png"} // Initially set to an empty string
                      alt="Profile Image"
                    />
                  </div>
                  <div className="flex sm:flex-col flex-row sm:gap-5 items-start justify-start mt-[22px] w-full">
                    <Text
                      className="sm:mt-0 mt-2 text-base text-indigo-800 tracking-[0.44px]"
                      size="txtPoppinsRegular16"
                    >
                      Email Address
                    </Text>
                    <input
                      type="email"
                      className="bg-white-A700 border border-blue_gray-100 border-solid h-12 sm:ml-[0] ml-[34px] sm:mt-0 mt-2 rounded-[12px] w-[42%]"
                      value={email}
                      placeholder={emaill}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <label
                    htmlFor="image"
                    className="sm:flex-1 sm:ml-[0] ml-[750px] text-base text-indigo-800 tracking-[0.44px] w-[16%] sm:w-full"
                  >
                    Change Profile Photo
                  </label>

                  <input
                    type="file"
                    id="image" // Make sure the id matches the label htmlFor
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handlePhotoChange}
                  />
                </div>
                <Button
                  className="cursor-pointer leading-[normal] min-w-[83px] md:ml-[0] ml-[759px] mr-[39px] mt-1.5 text-base text-center tracking-[0.44px]"
                  shape="round"
                  color="indigo_800"
                  onClick={handleUpdateFields}
                >
                  Save
                </Button>
                <Text
                  className="mt-[42px] text-[22px] text-center text-indigo-800 sm:text-lg md:text-xl"
                  size="txtPoppinsBold22"
                >
                  Change Password
                </Text>
                <div className="flex md:flex-col flex-row md:gap-5 items-end justify-start md:ml-[0] ml-[7px] mt-8 w-[95%] md:w-full">
                  <Text
                    className="mb-[26px] md:mt-0 mt-3.5 text-base text-indigo-800 tracking-[0.44px] w-[17%] sm:w-full"
                    size="txtPoppinsRegular16"
                  >
                   Current Password
                  </Text>
                  <input
                    type="password"
                    className="bg-white-A700 border border-blue_gray-100 border-solid h-12 rounded-[12px] w-[64%]"
                    value={currentpassword}
                    placeholder="xxxxxxxx"
                    onChange={(e) => setCurrentpassword(e.target.value)}
                  />
                </div>
                <div className="flex md:flex-col flex-row md:gap-5 items-end justify-start md:ml-[0] ml-[7px] mt-8 w-[95%] md:w-full">
                  <Text
                    className="mb-[26px] md:mt-0 mt-3.5 text-base text-indigo-800 tracking-[0.44px] w-[17%] sm:w-full"
                    size="txtPoppinsRegular16"
                  >
                    New Password
                  </Text>
                  <input
                    type="password"
                    className="bg-white-A700 border border-blue_gray-100 border-solid h-12 rounded-[12px] w-[64%]"
                    value={password}
                    placeholder="xxxxxxxx"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex md:flex-col flex-row md:gap-5 items-end justify-start md:ml-[0] ml-[7px] mt-8 w-[95%] md:w-full">
                  <Text
                    className="mb-[26px] md:mt-0 mt-3.5 text-base text-indigo-800 tracking-[0.44px] w-[17%] sm:w-full"
                    size="txtPoppinsRegular16"
                  >
                    Re-enter Password
                  </Text>
                  <input
                    type="password"
                    className="bg-white-A700 border border-blue_gray-100 border-solid h-12 rounded-[12px] w-[64%]"
                    value={confirmpassword}
                    placeholder="xxxxxxxx"
                    onChange={(e) => setConfirmpassword(e.target.value)}
                  />
                  <Button
                    className="cursor-pointer leading-[normal] min-w-[83px] md:ml-[0] ml-[172px] md:mt-0 mt-6 text-base text-center tracking-[0.44px]"
                    shape="round"
                    color="indigo_800"
                    onClick={handleUpdatePassword}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfilePage;
