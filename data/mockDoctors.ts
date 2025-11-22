import { DoctorCardData } from '../components/DoctorCard';

export const mockDoctors: DoctorCardData[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    hospital: 'Metro Heart Clinic',
    rating: 4.8,
    distance: '1.2 km',
    reviewCount: 245,
    photoUrl: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Dermatologist',
    hospital: 'Skin Health Medical Center',
    rating: 4.6,
    distance: '2.1 km',
    reviewCount: 189,
    photoUrl: 'https://images.pexels.com/photos/4273920/pexels-photo-4273920.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'General Practitioner',
    hospital: 'City General Hospital',
    rating: 4.9,
    distance: '0.8 km',
    reviewCount: 312,
    photoUrl: 'https://images.pexels.com/photos/5214969/pexels-photo-5214969.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialization: 'Orthopedic Surgeon',
    hospital: 'Bone & Joint Institute',
    rating: 4.7,
    distance: '3.4 km',
    reviewCount: 156,
    photoUrl: 'https://images.pexels.com/photos/3979095/pexels-photo-3979095.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  },
  {
    id: '5',
    name: 'Dr. Lisa Anderson',
    specialization: 'Ophthalmologist',
    hospital: 'Vision Care Center',
    rating: 4.5,
    distance: '1.9 km',
    reviewCount: 128,
    photoUrl: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  },
  {
    id: '6',
    name: 'Dr. Robert Martinez',
    specialization: 'Neurosurgeon',
    hospital: 'Neuro Excellence Hospital',
    rating: 4.9,
    distance: '4.2 km',
    reviewCount: 93,
    photoUrl: 'https://images.pexels.com/photos/4173258/pexels-photo-4173258.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  },
  {
    id: '7',
    name: 'Dr. Jennifer Lee',
    specialization: 'Pediatrician',
    hospital: 'Little Sunshine Children Hospital',
    rating: 4.8,
    distance: '2.6 km',
    reviewCount: 267,
    photoUrl: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  },
  {
    id: '8',
    name: 'Dr. David Kumar',
    specialization: 'Gastroenterologist',
    hospital: 'Digestive Health Medical Center',
    rating: 4.6,
    distance: '1.5 km',
    reviewCount: 174,
    photoUrl: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  },
  {
    id: '9',
    name: 'Dr. Amanda Foster',
    specialization: 'Psychiatrist',
    hospital: 'Mental Wellness Clinic',
    rating: 4.7,
    distance: '3.1 km',
    reviewCount: 201,
    photoUrl: 'https://images.pexels.com/photos/3768126/pexels-photo-3768126.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  },
  {
    id: '10',
    name: 'Dr. Christopher Brown',
    specialization: 'Cardiologist',
    hospital: 'Advanced Cardiac Care',
    rating: 4.8,
    distance: '2.8 km',
    reviewCount: 223,
    photoUrl: 'https://images.pexels.com/photos/4427899/pexels-photo-4427899.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  },
  {
    id: '11',
    name: 'Dr. Patricia Moore',
    specialization: 'Rheumatologist',
    hospital: 'Arthritis & Rheumatology Center',
    rating: 4.5,
    distance: '3.9 km',
    reviewCount: 112,
    photoUrl: 'https://images.pexels.com/photos/5621633/pexels-photo-5621633.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  },
  {
    id: '12',
    name: 'Dr. Thomas Hayes',
    specialization: 'Urologist',
    hospital: 'Urological Health Clinic',
    rating: 4.6,
    distance: '2.3 km',
    reviewCount: 145,
    photoUrl: 'https://images.pexels.com/photos/4273889/pexels-photo-4273889.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  },
];

export const filterDoctors = (query: string): DoctorCardData[] => {
  if (!query.trim()) {
    return mockDoctors;
  }

  const lowerQuery = query.toLowerCase().trim();

  return mockDoctors.filter((doctor) => {
    const nameMatch = doctor.name.toLowerCase().includes(lowerQuery);
    const hospitalMatch = doctor.hospital.toLowerCase().includes(lowerQuery);
    const specializationMatch = doctor.specialization.toLowerCase().includes(lowerQuery);

    return nameMatch || hospitalMatch || specializationMatch;
  });
};
