import { FieldValue, firebase } from '../lib/Firebase';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast, zoom, bounce } from 'react-toastify';


export async function doesUsernameExist(username) {
    const result = await firebase.firestore().collection('users').where('username', '==', username).get();

    return result.docs.length > 0;
}

export async function doesEmailExist(email) {
    const result = await firebase.firestore().collection('users').where('email', '==', email).get();
    return result.docs.length > 0;
}

export async function getUSerByUserId(userId) {
    const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();
    return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))
}


export async function getUserByUsername(username) {
    const result = await firebase.firestore()
        .collection('users')
        .where('username', '==', username)
        .get();


    return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))
}

export async function getUserPhotosByUserId(userId) {
    const photos = await firebase.firestore().collection('photos').where('userId', '==', userId).get();

    if (photos.docs.length > 0) {
        return photos.docs.map((item) => ({
            ...item.data(),
            docId: item.id
        }))
    }
    return [];
}


export async function getSuggestedProfiles(userId, following) {
    const result = await firebase.firestore().collection('users').limit(20).get();

    return result.docs.map((user) => ({ ...user.data(), docId: user.id }))
        .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));

}

export async function getFollowers(userId, followers) {
    const result = await firebase.firestore().collection('users').get();

    return result.docs.map((user) => ({ ...user.data(), docId: user.id }))
        .filter((profile) => profile.userId !== userId && followers.includes(profile.userId));
}

export async function getFollowings(userId, followings) {
    const result = await firebase.firestore().collection('users').get();

    return result.docs.map((user) => ({ ...user.data(), docId: user.id }))
        .filter((profile) => profile.userId !== userId && followings.includes(profile.userId));
}

export async function isUserFollowingProfile(loggedInUsername, profileUserId) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where("username", "==", loggedInUsername)
        .where("following", "array-contains", profileUserId)
        .get();

    const [response = {}] = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id,
    }))

    return Object.keys(response).length !== 0;;
}

export async function updateLoggedInUserFollowing(loggedInUserDocId, profileId, isFollowingProfile) {
    return await firebase.firestore()
        .collection('users')
        .doc(loggedInUserDocId)
        .update({
            following: isFollowingProfile ?
                FieldValue.arrayRemove(profileId)
                : FieldValue.arrayUnion(profileId)
        });

}

export async function updateFollowedUserFollowers(profileDocId, userId, isFollowedProfile) {
    return await firebase.firestore()
        .collection('users')
        .doc(profileDocId)
        .update({
            followers: isFollowedProfile ?
                FieldValue.arrayRemove(userId)
                : FieldValue.arrayUnion(userId)
        })
}

export async function updateUserProfile(docId, base64Image) {
    return await firebase.firestore()
        .collection('users')
        .doc(docId)
        .update({
            profilePicture: base64Image
        }).then(() => {
            document.getElementById("dp").src = base64Image;
        })
        .catch((error) => {
            toast.error("something went wrong");

        });
}

export async function updateUser(docId, user) {
    return await firebase.firestore()
        .collection('users')
        .doc(docId)
        .update({
            fullName: user.fullName,
            username: user.username,
            bio: user.bio,
            email: user.email,
            mobile: user.mobile,
            gender: user.gender
        }).then(() => {
            toast.success("details updated successfully");
        })
        .catch((error) => {
            toast.error("something went wrong, please try again");
        })
}


export async function getPhotos(userId, following) {
    const result = await firebase.firestore().collection('photos').where('userId', 'in', following).get();

    const userFollowedPhotos = result.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }));

    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true
            }

            const user = await getUSerByUserId(photo.userId);
            const { username, profilePicture } = user[0];
            return { username, profilePicture, ...photo, userLikedPhoto }
        })

    )
    return photosWithUserDetails;
}

export async function isUnique(uuid) {
    const result = await firebase.firestore().collection('photos').doc(uuid).get();
    if (result.exists) {
        return false;
    }
    return true;
}

export async function savePost(user, imageBase64) {
    var docId = "";
    while (true) {
        docId = uuidv4();
        if (isUnique(docId)) {
            break;
        }
    }

    const result = await firebase.firestore().collection('photos').doc(docId);
    const obj = {
        "caption": "new Image Added",
        "comments": [],
        "dateCreated": Date.now(),
        "imageSrc": imageBase64,
        "likes": [],
        "userId": user.userId,
        "userLatitude": "",
        "userLongitude": ""
    };

    result.set(obj)
        .then(() => {
            toast.success("uploaded successfully");
        })
        .catch((error) => {
            toast.error("something went wrong, please try again");
            console.error("Error uploading: ", error);
        });;
}