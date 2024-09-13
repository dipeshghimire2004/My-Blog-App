import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { useForm, Controller } from 'react-hook-form' 


function RTE({name, control,label,defaultValue=""}) {
  return (
    <div className='w-full'>
        {label && <label className="text-sm text-gray-600">{label}</label>}
    
    <Controller
        name={name || "content"}
        control={control}
        render={({field:{onChange}})=>(
            <Editor 
            initialValue={defaultValue}
            init={{
                initialValue:defaultValue,
                height:500,
                menubar:false,
                plugins:[
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={onChange}
            />

        )}
    />
    
    </div>
  )
}

export default RTE




// import { Controller } from "react-hook-form";

// import React from 'react'

// function RTE({name, control, label, defaultValue=""}) {
//   return (
//     <div>
//       {label && <label className="text-sm text-gray-600">{label}</label>}
//     </div>
//   )
// }

// export default RTE
