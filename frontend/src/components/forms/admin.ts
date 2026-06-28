// Admin-namespace re-exports of the shared form components.
// All admin modules should import form inputs from here to:
//   - maintain a clear admin/public boundary
//   - allow future admin-specific divergence without breaking public forms
export { TextInput     as AdminInput    } from './TextInput/TextInput'
export { TextAreaInput as AdminTextarea } from './TextAreaInput/TextAreaInput'
export { SelectInput   as AdminSelect   } from './SelectInput/SelectInput'
