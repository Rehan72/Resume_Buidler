import React, {useEffect, useState} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { dummyResumeData } from '../assets/asset'
import { ArrowLeftIcon, ArrowRightIcon, Briefcase, FileText, GraduationCap, Sparkles, User } from 'lucide-react'

function ResumeBuilder() {
  const { resumeId } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    skills: [],
    templates: 'classic',
    accent_color: '#3B82F6',
    public: false
  })
 const loadExistingResume=async()=>{
   const resume=dummyResumeData.find(r=>r._id===resumeId)
    if(resume){
      setData(resume)
    }
 }
 useEffect(()=>{
  loadExistingResume()
 },[])

 const [activeSectionIndex, setActiveSectionIndex]=useState(0)
 const [removeBackground,setRemoveBackground]=useState(false);

 const sections=[
  {id:'personal_info', name:'Personal Information',icon:User},
  {id:'professional_summary', name:'Professional Summary',icon:FileText},
  {id:'experience', name:'Experience',icon:Briefcase},
  {id:'education', name:'Education',icon:GraduationCap},
  {id:'skills', name:'Skills',icon:Sparkles},
 ]

 const activeSection=sections[activeSectionIndex];

  useEffect(() => {
    // find resume by id from dummy data, or create a new blank resume when id is 'resume123'
    if (!resumeId) return
    if (resumeId === 'resume123') {
      setData({
        title: "New Resume",
        personal_info: {
          full_name: '',
          profession: '',
          email: '',
          phone: '',
          location: ''
        }
      })
      return
    }

    const found = dummyResumeData.find(r => r._id === resumeId)
    if (found) {
      // shallow copy to allow editing
      setData({
        title: found.title || '',
        personal_info: {
          full_name: found.personal_info?.full_name || '',
          profession: found.personal_info?.profession || '',
          email: found.personal_info?.email || '',
          phone: found.personal_info?.phone || '',
          location: found.personal_info?.location || ''
        }
      })
    } else {
      // fallback
      setData({ title: 'Resume', personal_info: { full_name: '', profession: '', email: '', phone: '', location: '' } })
    }
  }, [resumeId])

  if (!data) return (
    <div className="max-w-7xl mx-auto px-4 py-8">Loading resume…</div>
  )

  function updateField(path, value) {
    setData(prev => {
      const next = {...prev}
      if (path.startsWith('personal_info.')) {
        const key = path.split('.')[1]
        next.personal_info = {...next.personal_info, [key]: value}
      } else {
        next[path] = value
      }
      return next
    })
  }

  function handleSave(e) {
    e.preventDefault()
    // For now we just navigate back to dashboard. In a real app you'd POST to the API.
    console.log('Saved resume:', data)
    navigate('/app')
  }

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <button onClick={() => navigate(-1)} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </button>
      </div>
      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>
          {/* Left panel form */}
          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
              {/* Progress bar using activeSectionIndex */}
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />
              <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000'
              style={{width:`${activeSectionIndex * 100/ (sections.length - 1) }%`}}
              />
              {/* Section Navigation */}
              <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'>
                <div></div>
                <div className='flex items-center'>
                  {activeSectionIndex !== 0 && (
                    <button
                      className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all'
                      disabled={activeSectionIndex === 0}
                      onClick={() => setActiveSectionIndex(prevIndex => Math.max(prevIndex - 1, 0))}
                    >
                      <ArrowLeftIcon className='size-4 text-slate-600 hover:text-slate-800 transition-colors' />
                      <span>Previous</span>
                    </button>
                  )}
                   <button
                      className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50'}`}
                      disabled={activeSectionIndex === 0}
                      onClick={() => setActiveSectionIndex(prevIndex => Math.max(prevIndex + 1, sections.length - 1))}
                    >
                     Next <ArrowRightIcon className='size-4 text-slate-600 hover:text-slate-800 transition-colors' />
                      
                    </button>

                </div>

              </div>
              {/* Form Content */}
              <div className='space-y-6'>
               {
                activeSection.id === 'personal_info' && (
                  <div></div>
                )
               }
              </div>
            </div>
          </div>
           <div>

           </div>
           {/* Right panel preview  */}
           <div></div>
        </div>

      </div>
    </div>
    // <div className="max-w-7xl mx-auto px-4 py-8">
    //   <div className="flex items-center justify-between mb-6">
    //     <h1 className="text-2xl font-bold">Resume Builder</h1>
    //     <div className="flex gap-2">
    //       <button onClick={() => navigate('/app')} className="px-3 py-2 border rounded-md">Cancel</button>
    //       <button onClick={handleSave} className="px-3 py-2 bg-green-600 text-white rounded-md">Save</button>
    //     </div>
    //   </div>

    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //     <form onSubmit={handleSave} className="md:col-span-2 space-y-4">
    //       <div>
    //         <label className="block text-sm font-medium mb-1">Resume title</label>
    //         <input value={data.title} onChange={e=>updateField('title', e.target.value)} className="w-full border px-3 py-2 rounded" />
    //       </div>

    //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    //         <div>
    //           <label className="block text-sm font-medium mb-1">Full name</label>
    //           <input value={data.personal_info.full_name} onChange={e=>updateField('personal_info.full_name', e.target.value)} className="w-full border px-3 py-2 rounded" />
    //         </div>
    //         <div>
    //           <label className="block text-sm font-medium mb-1">Profession</label>
    //           <input value={data.personal_info.profession} onChange={e=>updateField('personal_info.profession', e.target.value)} className="w-full border px-3 py-2 rounded" />
    //         </div>
    //       </div>

    //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    //         <div>
    //           <label className="block text-sm font-medium mb-1">Email</label>
    //           <input value={data.personal_info.email} onChange={e=>updateField('personal_info.email', e.target.value)} className="w-full border px-3 py-2 rounded" />
    //         </div>
    //         <div>
    //           <label className="block text-sm font-medium mb-1">Phone</label>
    //           <input value={data.personal_info.phone} onChange={e=>updateField('personal_info.phone', e.target.value)} className="w-full border px-3 py-2 rounded" />
    //         </div>
    //       </div>

    //       <div>
    //         <label className="block text-sm font-medium mb-1">Location</label>
    //         <input value={data.personal_info.location} onChange={e=>updateField('personal_info.location', e.target.value)} className="w-full border px-3 py-2 rounded" />
    //       </div>

    //       <div className="pt-4">
    //         <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Save & Preview</button>
    //       </div>
    //     </form>

    //     <aside className="md:col-span-1 bg-white border rounded p-4">
    //       <h3 className="text-lg font-semibold mb-3">Preview</h3>
    //       <div className="p-4 border rounded">
    //         <h2 className="text-xl font-bold">{data.personal_info.full_name || 'Your Name'}</h2>
    //         <p className="text-sm text-slate-600 mb-2">{data.personal_info.profession || 'Profession'}</p>
    //         <p className="text-sm">{data.personal_info.email}</p>
    //         <p className="text-sm">{data.personal_info.phone}</p>
    //         <p className="text-sm text-slate-500 mt-3">{data.personal_info.location}</p>
    //       </div>
    //     </aside>
    //   </div>
    // </div>
  )
}

export default ResumeBuilder