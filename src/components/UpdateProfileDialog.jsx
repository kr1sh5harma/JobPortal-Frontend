import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, Upload } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT, apiClient } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const { user } = useSelector(store => store.auth || {})
  const dispatch = useDispatch()

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.join(', ') || '',
    file: null,
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const fileChangeHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('fullname', input.fullname)
    formData.append('email', input.email)
    if (input.phoneNumber && !isNaN(Number(input.phoneNumber))) {
      formData.append('phoneNumber', input.phoneNumber)
    }
    formData.append('bio', input.bio)
    formData.append('skills', input.skills)
    if (input.file) formData.append('file', input.file)

    try {
      setLoading(true)
      const res = await apiClient.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Update failed')
    } finally {
      setLoading(false)
    }
    setOpen(false)
  }

  const fields = [
    { id: 'fullname', label: 'Name', type: 'text' },
    { id: 'email', label: 'Email', type: 'email' },
    { id: 'phoneNumber', label: 'Phone', type: 'text' },
    { id: 'bio', label: 'Bio', type: 'text' },
    { id: 'skills', label: 'Skills', type: 'text', placeholder: 'React, Node.js, MongoDB' },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[480px] glass-strong border-violet-500/15 rounded-xl" onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="space-y-4 py-4">
            {fields.map((field) => (
              <div key={field.id}>
                <Label htmlFor={field.id} className="text-sm font-medium mb-1.5 block">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  value={input[field.id]}
                  onChange={changeEventHandler}
                  placeholder={field.placeholder}
                  className="bg-muted/50 border-violet-500/10 focus:border-violet-500/30 h-10"
                />
              </div>
            ))}

            {/* Resume Upload */}
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Resume (PDF)</Label>
              <label className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl border border-violet-500/10 bg-muted/30 hover:bg-violet-500/5 transition-all">
                <Upload className="w-4 h-4 text-violet-400 shrink-0" />
                <span className="text-sm text-muted-foreground truncate">
                  {input.file?.name || 'Choose a file...'}
                </span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-lg shadow-violet-600/25 cursor-pointer"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfileDialog