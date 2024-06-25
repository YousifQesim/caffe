import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});



const categorySchema = yup.object().shape({
    newCategoryName: yup.string()
      .min(2, 'Category name is too short!')
      .max(50, 'Category name is too long!')
      .required('Category name is required'),
  });
  
  const itemSchema = yup.object().shape({
    selectedCategory: yup.number().required('Please select a category'),
    newItemName: yup.string()
      .min(2, 'Item name is too short!')
      .max(50, 'Item name is too long!')
      .required('Item name is required'),
    newItemPrice: yup.number()
      .positive('Price must be a positive number')
      .required('Item price is required'),
    selectedItemImage: yup.mixed().required('Item image is required'),
  });
export { loginValidationSchema,categorySchema,itemSchema};