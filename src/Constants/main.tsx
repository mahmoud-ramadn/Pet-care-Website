import { Mail, MapIcon, PhoneCall } from "lucide-react";



import type { ReactElement } from "react";



import { ProjectImages } from "./images";





type ContactLink = {
  icon: () => ReactElement
  text: string
  href: string
  external?: boolean
}

export const HeaderLinks: HeaderLinksType[] = [
  { href: "/", labelKey: "HomePageLink" },
  { href: "/", labelKey: "AboutPageLink" },
  { href: "adoption", labelKey: "AdoptionPageLink" },
  { href: "/", labelKey: "ContactUsPageLink" },
  { href: "vet", labelKey: "Vet" },
  { href: "services", labelKey: "ServicesPageLink" },
]

export const contactLinks: ContactLink[] = [
  {
    icon: () => <PhoneCall />,
    text: "0106795810",
    href: "https://wa.me/20106795810",
    external: true,
  },
  {
    icon: () => <Mail />,
    text: "mahmoudramdan2000135@gmail.com",
    href: "mailto:mahmoudramdan2000135@gmail.com",
    external: false,
  },
  {
    icon: () => <MapIcon />,
    text: "Damietta, Egypt",
    href: "https://www.google.com/maps/place/Damietta,+Egypt",
    external: true,
  },
]

type TermsAndCondition = {
  id: string
  link: string
}

export const TermsAndConditions: TermsAndCondition[] = [
  {
    id: "1",
    link: "Privacy policy",
  },
  {
    id: "2",
    link: "About Us",
  },
  {
    id: "3",
    link: "Help",
  },
]

export const GroomingReviewsMock: GroomingReviewsMock[] = [
  {
    id: "1",
    image: "https://placehold.co/100x100", // صورة وهمية
    altImage: "Dog grooming image",
    serviceName: "Happy Paws Grooming",
    address: "123 Pet Street, Cairo, Egypt",
    price: "EGP 250",
    ratingNum: 1,
  },
  {
    id: "2",
    image: "https://placehold.co/100x100",
    altImage: "Cat grooming image",
    serviceName: "Royal Pet Spa",
    address: "456 Animal Ave, Giza",
    price: "EGP 300",
    ratingNum: 4,
  },
  {
    id: "3",
    image: "https://placehold.co/100x100",
    altImage: "Pet salon",
    serviceName: "Purrfect Cuts",
    address: "12 Zamalek Street, Cairo",
    price: "EGP 280",
    ratingNum: 5,
  },
  {
    id: "4",
    image: "https://placehold.co/100x100",
    altImage: "Mobile pet grooming van",
    serviceName: "Groom On Wheels",
    address: "Mobile service - Cairo & Giza",
    price: "EGP 350",
    ratingNum: 6,
  },
  {
    id: "5",
    image: "https://placehold.co/100x100",
    altImage: "Mobile pet grooming van",
    serviceName: "Groom On Wheels",
    address: "Mobile service - Cairo & Giza",
    price: "EGP 350",
    ratingNum: 5,
  },
  {
    id: "5",
    image: "https://placehold.co/100x100",
    altImage: "Mobile pet grooming van",
    serviceName: "Groom On Wheels",
    address: "Mobile service - Cairo & Giza",
    price: "EGP 350",
    ratingNum: 5,
  },
  {
    id: "5",
    image: "https://placehold.co/100x100",
    altImage: "Mobile pet grooming van",
    serviceName: "Groom On Wheels",
    address: "Mobile service - Cairo & Giza",
    price: "EGP 350",
    ratingNum: 5,
  },
  {
    id: "5",
    image: "https://placehold.co/100x100",
    altImage: "Mobile pet grooming van",
    serviceName: "Groom On Wheels",
    address: "Mobile service - Cairo & Giza",
    price: "EGP 350",
    ratingNum: 5,
  },
]

export const AdoptionNavigationLink: AdoptionNavigationLink[] = [
  {
    id: "1",
    path: "shilter",
    image: ProjectImages.adoption.shelter,
  },
  {
    id: "2",
    path: "cat",
    image: ProjectImages.adoption.cat,
  },
  {
    id: "3",
    path: "dog",
    image: ProjectImages.adoption.dog,
  },
]
export const VetNavigationLink: AdoptionNavigationLink[] = [
  {
    id: "1",
    path: "doctors",
    image: ProjectImages.HomSquerNav.Veterinary,
  },
  {
    id: "2",
    path: "clinics",
    image: ProjectImages.vet.clinics,
  },
]
export const HomNavigationLink: HomeBoxNavigationLink[] = [
  {
    id: "1",
    path: "Veterinary",
    image: ProjectImages.HomSquerNav.Veterinary,
  },
  {
    id: "2",
    path: "Day Care",
    image: ProjectImages.HomSquerNav.DayCare,
  },
  {
    id: "3",
    path: "Supplies",
    image: ProjectImages.HomSquerNav.Suppllies,
  },
  {
    id: "4",
    path: "Adoption",
    image: ProjectImages.HomSquerNav.Adoption,
  },
  {
    id: "5",
    path: "More",
    image: ProjectImages.HomSquerNav.PetFoot,
  },
]

export const PlanningToAdoptData: PlanningCardType[] = [
  {
    id: "1",
    icon: ProjectImages.adoption.planningToAdopt.one,
    title: "Checklist for new adopters",
    description: "Make the adoption transition as smooth as possible",
  },
  {
    id: "2",
    icon: ProjectImages.adoption.planningToAdopt.two,
    title: "COVID-19 Resources",
    description: "Find out how you can help dogs and cats",
  },
  {
    id: "3",
    icon: ProjectImages.adoption.planningToAdopt.three,
    title: "Pet adoption FAQs",
    description: "Answer all questions you haven’t thought of for your adoption",
  },
]
export const VeterinaryServicesData: PlanningCardType[] = [
  {
    id: "1",
    icon: ProjectImages.vet.PetVaccination,
    title: "Pet Vaccination",
    description: "Keep your pet healthy and happy get them vaccinated!",
  },
  {
    id: "2",
    icon: ProjectImages.vet.PetVeterinary,
    title: "Pet Veterinary",
    description: "Keep your pet healthy and happy with monthly checkup",
  },
  {
    id: "3",
    icon: ProjectImages.vet.PetSugery,
    title: "Pet Surgery",
    description: "Keep your pet healthy and happy",
  },
]

export const adoptedPetsMock: Pet[] = [
  {
    _id: "1",
    id: "1",
    name: "Luna",
    petImage: "https://placekitten.com/400/300",
    type: "cat",
    birthday: "2022-01-01",
    category: "Persian",
    gender: "Female",
    profileBio: "Calm and affectionate",
    weight: 4,
    adoptionDay: "2023-03-15",
    size: "small",
    owner: "shelter",
    shelterInfo: "Shelter A",
    availableForAdoption: false,
    vaccinations_id: [],
    successflyAdaped: true,
  },
  {
    _id: "2",
    id: "2",
    name: "Max",
    petImage: "https://placedog.net/400/300?id=2",
    type: "dog",
    birthday: "2021-06-12",
    category: "Golden Retriever",
    gender: "Male",
    profileBio: "Playful and friendly",
    weight: 25,
    adoptionDay: "2023-05-10",
    size: "large",
    owner: "shelter",
    shelterInfo: "Shelter B",
    availableForAdoption: false,
    vaccinations_id: [],
    successflyAdaped: true,
  },
  {
    _id: "3",
    id: "3",
    name: "Milo",
    petImage: "https://placekitten.com/401/300",
    type: "cat",
    birthday: "2023-02-11",
    category: "Siamese",
    gender: "Male",
    profileBio: "Curious and talkative",
    weight: 3,
    adoptionDay: "2023-11-01",
    size: "small",
    owner: "shelter",
    shelterInfo: "Shelter C",
    availableForAdoption: false,
    vaccinations_id: [],
    successflyAdaped: true,
  },
  {
    _id: "4",
    id: "4",
    name: "Bella",
    petImage: "https://placedog.net/401/300?id=4",
    type: "dog",
    birthday: "2020-09-20",
    category: "Beagle",
    gender: "Female",
    profileBio: "Smart and loyal",
    weight: 10,
    adoptionDay: "2023-07-23",
    size: "medium",
    owner: "shelter",
    shelterInfo: "Shelter D",
    availableForAdoption: false,
    vaccinations_id: [],
    successflyAdaped: true,
  },
  {
    _id: "5",
    id: "5",
    name: "Simba",
    petImage: "https://placekitten.com/402/300",
    type: "cat",
    birthday: "2021-12-10",
    category: "British Shorthair",
    gender: "Male",
    profileBio: "Chill and cuddly",
    weight: 5,
    adoptionDay: "2024-01-10",
    size: "medium",
    owner: "shelter",
    shelterInfo: "Shelter E",
    availableForAdoption: false,
    vaccinations_id: [],
    successflyAdaped: true,
  },
  {
    _id: "6",
    id: "6",
    name: "Daisy",
    petImage: "https://placedog.net/402/300?id=6",
    type: "dog",
    birthday: "2019-08-17",
    category: "Poodle",
    gender: "Female",
    profileBio: "Elegant and smart",
    weight: 8,
    adoptionDay: "2023-10-30",
    size: "small",
    owner: "shelter",
    shelterInfo: "Shelter F",
    availableForAdoption: false,
    vaccinations_id: [],
    successflyAdaped: true,
  },
  {
    _id: "7",
    id: "7",
    name: "Oliver",
    petImage: "https://placekitten.com/403/300",
    type: "cat",
    birthday: "2022-05-05",
    category: "Maine Coon",
    gender: "Male",
    profileBio: "Fluffy and relaxed",
    weight: 7,
    adoptionDay: "2024-03-14",
    size: "large",
    owner: "shelter",
    shelterInfo: "Shelter G",
    availableForAdoption: false,
    vaccinations_id: [],
    successflyAdaped: true,
  },
  {
    _id: "8",
    id: "8",
    name: "Rocky",
    petImage: "https://placedog.net/403/300?id=8",
    type: "dog",
    birthday: "2020-03-25",
    category: "Boxer",
    gender: "Male",
    profileBio: "Energetic and strong",
    weight: 30,
    adoptionDay: "2024-05-01",
    size: "large",
    owner: "shelter",
    shelterInfo: "Shelter H",
    availableForAdoption: false,
    vaccinations_id: [],
    successflyAdaped: true,
  },
]

export const BlogsMock: BlogCardType[] = [
  {
    id: "1",
    image: ProjectImages.adoption.blog.BlogOne,
    title: "Reasons for Pet Adoption",
  },
  {
    id: "2",
    image: ProjectImages.adoption.blog.BlogTwo,
    title: "Reasons for Pet Adoption",
  },
  {
    id: "3",
    image: ProjectImages.adoption.blog.BlogThree,
    title: "Reasons for Pet Adoption",
  },
]

export const topCollectionsMock: TopCollectionsCardType[] = [
  {
    id: "1",
    image: "https://picsum.photos/400/300?random=1",
    title: "Modern Architecture",
    type: "Design",
  },
  {
    id: "2",
    image: "https://picsum.photos/400/300?random=2",
    title: "Minimal Fashion",
    type: "Fashion",
  },
  {
    id: "3",
    image: "https://picsum.photos/400/300?random=3",
    title: "Nature Wonders",
    type: "Photography",
  },
]

export const shelterMockData: ShelterCardType[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1583511655826-05700442b31b",
    title: "Paws Haven Shelter",
    rate: 4,
    time: "9:00 AM - 6:00 PM",
    address: "123 Pet Street, New York, NY",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1534361960057-198d9324ae9b",
    title: "Whisker Sanctuary",
    rate: 5,
    time: "8:30 AM - 7:00 PM",
    address: "456 Animal Lane, Los Angeles, CA",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1453227588063-bb302b62f50b",
    title: "Safe Tails Rescue",
    rate: 3,
    time: "10:00 AM - 5:30 PM",
    address: "789 Rescue Road, Chicago, IL",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48",
    title: "Happy Tails Shelter",
    rate: 4,
    time: "9:30 AM - 6:30 PM",
    address: "101 Bark Avenue, Houston, TX",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b",
    title: "Furever Friends",
    rate: 5,
    time: "8:00 AM - 7:30 PM",
    address: "202 Meow Street, Phoenix, AZ",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80",
    title: "Second Chance Shelter",
    rate: 4,
    time: "10:00 AM - 5:00 PM",
    address: "303 Adoption Blvd, Philadelphia, PA",
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1544568100-847a948585b9",
    title: "Hope Animal Rescue",
    rate: 3,
    time: "9:00 AM - 6:00 PM",
    address: "404 Care Circle, San Antonio, TX",
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
    title: "Angel Paws Foundation",
    rate: 5,
    time: "8:00 AM - 8:00 PM",
    address: "505 Compassion Way, San Diego, CA",
  },
]

export const MeetOurBestDoctorsMock: CircleCardType[] = [
  {
    id: "1",
    image: "https://placedog.net/300/300?id=1",
    name: "Dog Food",
    specific: "Healthy meals for your dog",
  },
  {
    id: "2",
    image: "https://placekitten.com/300/300",
    name: "Cat Toys",
    specific: "Fun toys for your cat",
  },
  {
    id: "3",
    image: "https://picsum.photos/300/300?random=3",
    name: "Veterinary",
    specific: "Top care for your pets",
  },
  {
    id: "4",
    image: "https://picsum.photos/300/300?random=4",
    name: "Grooming",
    specific: "Best grooming services",
  },
  {
    id: "5",
    image: "https://picsum.photos/300/300?random=5",
    name: "Adoption",
    specific: "Find your new best friend",
  },
]