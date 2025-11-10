import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyResumeData } from '../assets/asset'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigator = useNavigate();
  const colors= ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]
  // pastel gradient pairs to match screenshot (subtle light backgrounds)
  const gradients = [
    'linear-gradient(135deg, rgba(147,51,234,0.12), rgba(147,51,234,0.04))',
    'linear-gradient(135deg, rgba(217,119,6,0.12), rgba(217,119,6,0.04))',
    'linear-gradient(135deg, rgba(220,38,38,0.12), rgba(220,38,38,0.04))',
    'linear-gradient(135deg, rgba(2,132,199,0.12), rgba(2,132,199,0.04))',
    'linear-gradient(135deg, rgba(22,163,74,0.12), rgba(22,163,74,0.04))'
  ]
  const [allResumes, setAllResumes] = React.useState([])
  const [showCreateResume, setShowCreateResume] = React.useState(false);
  const [showUpdateResume, setShowUpdateResume] = React.useState(false);
  const [title, setTitle] = useState('');
  const [editResumeId, setEditResumeId] = useState('');
  const [resume, setResume] = useState(null);
  const loadAllResumes = async() => {
    setAllResumes(dummyResumeData)
  }
  useEffect(() => {
    loadAllResumes()
  }, [])

  const createResume=async(e)=>{
    e.preventDefault();
    // Logic to create a new resume
    console.log("Creating resume with title:", title);
    // After creating, close the modal and refresh the list
    setShowCreateResume(false);
    navigator('/app/builder/resume123');
    setTitle('');
  }
  const uploadResume=async(e)=>{
    e.preventDefault();
     setShowUpdateResume(false);
    navigator('/app/builder/resume123');
  }
  const editTitle=async(e)=>{
    e.preventDefault();
  }
  const deleteResume=async(resumeId)=>{
    const confirmed = window.confirm("Are you sure you want to delete this resume?");
    if (confirmed) {
      // Logic to delete the resume
      setAllResumes(prevResumes => prevResumes.filter(resume => resume._id !== resumeId));
      console.log("Deleting resume with ID:", resumeId);
      // After deleting, refresh the list
    }
  }
  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <p className='text-2xl fon-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text-transparent sm:hidden'>Welcome, joe Doe</p>
        <div className='flex gap-4'>
         <button onClick={()=>setShowCreateResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
          <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full'/>
          <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>
            Create Resume
          </p>
         </button>
         <button onClick={()=>setShowUpdateResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
          <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full'/>
          <p className='text-sm group-hover:text-purple-600 transition-all duration-300'>
            Upload Existing
          </p>
         </button>
        </div>
        <hr className='border-slate-300 my-6 sm:w-[305px]'/>
        <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
          {allResumes?.map((resume,index)=>{
          const baseColor = colors[index % colors.length];
          return (
            // add `group` so child group-hover classes work
        <button key={index} onClick={()=>navigator(`/app/builder/${resume._id}`)} className='group relative w-full sm:w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-800 border border-transparent hover:shadow-xl transition-all duration-300 cursor-pointer' style={{background: gradients[index % gradients.length], borderColor: 'rgba(0,0,0,0.04)'}}>
              <FilePenLineIcon className='size-7 group-hover:scale-105 transition-all ' style={{color:baseColor}}/>
          <p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style={{color:baseColor}}>{resume.title}</p>
          <p className='absolute bottom-1 text-[11px] text-slate-500 group-hover:text-slate-600 transition-all duration-300 px-2 text-center' style={{color:'rgba(0,0,0,0.45)'}} >
                Updated on: {new Date(resume.updatedAt).toLocaleDateString()}
               </p>
               <div onClick={(e)=>e.stopPropagation()} className='absolute top-1 right-1 group-hover:flex items-center hidden'>
                <TrashIcon onClick={()=>deleteResume(resume._id)} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors' />
                <PencilIcon onClick={()=>{setEditResumeId(resume._id); setTitle(resume.title)}} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors' />
               </div>
            </button>
          )
          })}

        </div>
        {showCreateResume &&(
          <form onSubmit={createResume} onClick={()=>setShowCreateResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
          <div onClick={e=>e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
            <h2 className='text-xl font-bold mb-4'>Create a resume</h2>
            <input
              type="text"
              placeholder='Enter resume title'
              className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600 outline-none rounded'
              required
              value={title}
              onChange={e=>setTitle(e.target.value)}
              autoFocus
            />
            <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>Create Resume</button>
            <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors'
            onClick={()=>{setShowCreateResume(false); setTitle('')}} />
          </div>
          </form>
      )}
      {showUpdateResume &&(
        <form onSubmit={uploadResume} onClick={()=>setShowUpdateResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
          <div onClick={e=>e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
            <h2 className='text-xl font-bold mb-4'>Upload Resume</h2>
            <input
              type="text"
              placeholder='Enter resume title'
              className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600 outline-none rounded'
              required
              value={title}
              onChange={e=>setTitle(e.target.value)}
              autoFocus
            />
            <div>
              <label htmlFor='resume-input' className='block text-sm text-slate-700' >
                Select Resume File
                <div className='flex flex-col item-center justify-center gap-2
              border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors'>
                  {
                    resume ? (
                      <p className='text-green-700'>{resume.name}</p>
                    ) : (
                      <>
                      <UploadCloudIcon className='size-14 stroke-1'/>
                      <p>Upload resume</p>
                      </>
                    )
                  }
                </div>
              </label>
              <input
                id='resume-input'
                type="file" 
                accept='.pdf'
                hidden
                onChange={(e)=>setResume(e.target.files[0])}
                />
            </div>
            <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>Upload Resume</button>
            <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors'
            onClick={()=>{setShowUpdateResume(false); setTitle('')}} />
          </div>
          </form>
      )}
       {editResumeId &&(
          <form onSubmit={editTitle} onClick={()=>setEditResumeId('')} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
          <div onClick={e=>e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
            <h2 className='text-xl font-bold mb-4'>Edit Resume Title</h2>
            <input
              type="text"
              placeholder='Enter resume title'
              className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600 outline-none rounded'
              required
              value={title}
              onChange={e=>setTitle(e.target.value)}
              autoFocus
            />
            <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>Update</button>
            <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors'
            onClick={()=>{setEditResumeId(''); setTitle('')}} />
          </div>
          </form>
      )}
      </div>
    </div>
  )
}

export default Dashboard