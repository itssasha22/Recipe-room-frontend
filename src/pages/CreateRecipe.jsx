/**
 * Handles validation, image upload, and dynamic ingredient/step management.
 */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createRecipe, clearError } from '../store/recipeSlice';
import './CreateRecipe.css';
const CreateRecipe = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get loading and error states from the Redux
    const { create: isCreating } = useSelector((state) => state.recipes.loading);
    const { create: createError } = useSelector((state) => state.recipes.error);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        country: '',
        people_served: 4,
        prep_time: '',
        cook_time: '',
        image: null
    });

    // Dynamic lists state
    const [ingredients, setIngredients] = useState([
        { name: '', quantity: '', notes: '' }
    ]);

    const [procedureSteps, setProcedureSteps] = useState([
        { step: 1, instruction: '', notes: '' }
    ]);

    // Image preview state
    const [imagePreview, setImagePreview] = useState(null);

    // Validation errors
    const [validationErrors, setValidationErrors] = useState({});
    // HANDLERS - Form input changes
    // Handle basic form field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear validation error for this field
        if (validationErrors[name]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    
     //Handle number input changes (people served, times)
    
    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        const numValue = value === '' ? '' : parseInt(value);
        setFormData(prev => ({
            ...prev,
            [name]: numValue
        }));
    };

    /**
     * Handle image file selection
     */
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setValidationErrors(prev => ({
                ...prev,
                image: 'Please select a valid image file'
            }));
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setValidationErrors(prev => ({
                ...prev,
                image: 'Image size must be less than 5MB'
            }));
            return;
        }

        // Convert to base64 for upload
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({
                ...prev,
                image: reader.result
            }));
            setImagePreview(reader.result);

            // Clear image error
            if (validationErrors.image) {
                setValidationErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.image;
                    return newErrors;
                });
            }
        };
        reader.readAsDataURL(file);
    };

    //Add new ingredient field
    
    const handleAddIngredient = () => {
        setIngredients(prev => [
            ...prev,
            { name: '', quantity: '', notes: '' }
        ]);
    };

    /**
     * Remove ingredient field
     */
    const handleRemoveIngredient = (index) => {
        if (ingredients.length === 1) return; // Keep at least one
        setIngredients(prev => prev.filter((_, i) => i !== index));
    };

    /**
     * Update ingredient field value
     */
    const handleIngredientChange = (index, field, value) => {
        setIngredients(prev => prev.map((ing, i) => {
            if (i === index) {
                return { ...ing, [field]: value };
            }
            return ing;
        }));
    };

    /**
     * Add new procedure step
     */
    const handleAddStep = () => {
        setProcedureSteps(prev => [
            ...prev,
            { step: prev.length + 1, instruction: '', notes: '' }
        ]);
    };

    //remove 
    const handleRemoveStep = (index) => {
        if (procedureSteps.length === 1) return; // Keep at least one
        setProcedureSteps(prev => {
            const newSteps = prev.filter((_, i) => i !== index);
            // Renumber steps
            return newSteps.map((step, i) => ({
                ...step,
                step: i + 1
            }));
        });
    };

    /**
     * Update procedure step value
     */
    const handleStepChange = (index, field, value) => {
        setProcedureSteps(prev => prev.map((step, i) => {
            if (i === index) {
                return { ...step, [field]: value };
            }
            return step;
        }));
    };

    //validation before submission
    const validateForm = () => {
        const errors = {};

        // Title validation
        if (!formData.title.trim()) {
            errors.title = 'Recipe title is required';
        } else if (formData.title.length < 3) {
            errors.title = 'Title must be at least 3 characters';
        }

        // People served validation
        if (!formData.people_served || formData.people_served < 1) {
            errors.people_served = 'Please specify how many people this recipe serves';
        }

        // Ingredients validation
        const validIngredients = ingredients.filter(ing =>
            ing.name.trim() && ing.quantity.trim()
        );
        if (validIngredients.length === 0) {
            errors.ingredients = 'Please add at least one ingredient with name and quantity';
        }

        // Procedure validation
        const validSteps = procedureSteps.filter(step =>
            step.instruction.trim()
        );
        if (validSteps.length === 0) {
            errors.procedure = 'Please add at least one cooking step';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    //submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous API errors
        if (createError) {
            dispatch(clearError('create'));
        }

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Prepare data for submission
        const recipeData = {
            title: formData.title.trim(),
            description: formData.description.trim() || null,
            country: formData.country.trim() || null,
            people_served: parseInt(formData.people_served),
            prep_time: formData.prep_time ? parseInt(formData.prep_time) : null,
            cook_time: formData.cook_time ? parseInt(formData.cook_time) : null,
            ingredients: ingredients.filter(ing => ing.name.trim() && ing.quantity.trim()),
            procedure: procedureSteps.filter(step => step.instruction.trim()),
            image: formData.image
        };

        // Dispatch create action
        try {
            const result = await dispatch(createRecipe(recipeData)).unwrap();
            // Success - navigate to the new recipe page
            navigate(`/recipes/${result.recipe_id}`);
        } catch (error) {
            // Error is handled by Redux state
            console.error('Failed to create recipe:', error);
        }
    };

    //Render

    return (
        <div className="create-recipe-container">
            <div className="create-recipe-header">
                <h1>Create New Recipe</h1>
                <p>Share your culinary creation with the world</p>
            </div>

            <form className="create-recipe-form" onSubmit={handleSubmit}>
                {/* Global error message */}
                {createError && (
                    <div className="error-alert">
                        <span className="error-icon">!</span>
                        {createError}
                    </div>
                )}

                {/* Basic Information Section */}
                <section className="form-section">
                    <h2>Basic Information</h2>

                    <div className="form-group">
                        <label htmlFor="title" className="required">Recipe Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="e.g., Grandma's Chocolate Chip Cookies"
                            className={validationErrors.title ? 'error' : ''}
                        />
                        {validationErrors.title && (
                            <span className="error-text">{validationErrors.title}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description (Optional)</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Tell us about this recipe..."
                            rows="3"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="country">Country/Cuisine</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                placeholder="e.g., Kenya, Italy, Mexico"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="people_served" className="required">Serves</label>
                            <input
                                type="number"
                                id="people_served"
                                name="people_served"
                                value={formData.people_served}
                                onChange={handleNumberChange}
                                min="1"
                                className={validationErrors.people_served ? 'error' : ''}
                            />
                            {validationErrors.people_served && (
                                <span className="error-text">{validationErrors.people_served}</span>
                            )}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="prep_time">Prep Time (minutes)</label>
                            <input
                                type="number"
                                id="prep_time"
                                name="prep_time"
                                value={formData.prep_time}
                                onChange={handleNumberChange}
                                min="0"
                                placeholder="e.g., 15"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cook_time">Cook Time (minutes)</label>
                            <input
                                type="number"
                                id="cook_time"
                                name="cook_time"
                                value={formData.cook_time}
                                onChange={handleNumberChange}
                                min="0"
                                placeholder="e.g., 30"
                            />
                        </div>
                    </div>
                </section>

                {/* Image Upload Section */}
                <section className="form-section">
                    <h2>Recipe Image (Optional)</h2>

                    <div className="image-upload-container">
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="image" className="image-upload-label">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Recipe preview" className="image-preview" />
                            ) : (
                                <div className="image-placeholder">
                                    <span className="upload-icon">📷</span>
                                    <p>Click to upload image</p>
                                    <p className="upload-hint">Max size: 5MB</p>
                                </div>
                            )}
                        </label>
                        {validationErrors.image && (
                            <span className="error-text">{validationErrors.image}</span>
                        )}
                    </div>
                </section>

                {/* Ingredients Section */}
                <section className="form-section">
                    <div className="section-header">
                        <h2>Ingredients</h2>
                        <button
                            type="button"
                            onClick={handleAddIngredient}
                            className="btn-add-item"
                        >
                            + Add Ingredient
                        </button>
                    </div>

                    {validationErrors.ingredients && (
                        <span className="error-text">{validationErrors.ingredients}</span>
                    )}

                    <div className="ingredients-list">
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className="ingredient-item">
                                <div className="ingredient-inputs">
                                    <input
                                        type="text"
                                        placeholder="Ingredient name"
                                        value={ingredient.name}
                                        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                        className="ingredient-name"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Quantity"
                                        value={ingredient.quantity}
                                        onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                                        className="ingredient-quantity"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Notes (optional)"
                                        value={ingredient.notes}
                                        onChange={(e) => handleIngredientChange(index, 'notes', e.target.value)}
                                        className="ingredient-notes"
                                    />
                                </div>
                                {ingredients.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveIngredient(index)}
                                        className="btn-remove-item"
                                        aria-label="Remove ingredient"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Procedure Section */}
                <section className="form-section">
                    <div className="section-header">
                        <h2>Cooking Instructions</h2>
                        <button
                            type="button"
                            onClick={handleAddStep}
                            className="btn-add-item"
                        >
                            + Add Step
                        </button>
                    </div>

                    {validationErrors.procedure && (
                        <span className="error-text">{validationErrors.procedure}</span>
                    )}

                    <div className="procedure-list">
                        {procedureSteps.map((step, index) => (
                            <div key={index} className="procedure-item">
                                <div className="step-number">{step.step}</div>
                                <div className="step-inputs">
                                    <textarea
                                        placeholder="Describe this step..."
                                        value={step.instruction}
                                        onChange={(e) => handleStepChange(index, 'instruction', e.target.value)}
                                        rows="2"
                                        className="step-instruction"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Additional notes (optional)"
                                        value={step.notes}
                                        onChange={(e) => handleStepChange(index, 'notes', e.target.value)}
                                        className="step-notes"
                                    />
                                </div>
                                {procedureSteps.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveStep(index)}
                                        className="btn-remove-item"
                                        aria-label="Remove step"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Form Actions */}
                <div className="form-actions">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn-secondary"
                        disabled={isCreating}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={isCreating}
                    >
                        {isCreating ? 'Creating Recipe...' : 'Create Recipe'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateRecipe;