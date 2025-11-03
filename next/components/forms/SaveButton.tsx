"use client"
import React, { FC } from "react";
import { useFormStatus } from "react-dom";

interface IProps {
state:any;
}

const SaveButton:FC<IProps> = ({state}) => {
	const { pending } = useFormStatus();
	const { message, error, success } = state;
    return (
	    <button
		    type="submit"

		    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
	    >
		    {pending ? (
			    <>
				    <svg
					    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
					    xmlns="http://www.w3.org/2000/svg"
					    fill="none"
					    viewBox="0 0 24 24"
				    >
					    <circle
						    className="opacity-25"
						    cx="12"
						    cy="12"
						    r="10"
						    stroke="currentColor"
						    strokeWidth="4"
					    ></circle>
					    <path
						    className="opacity-75"
						    fill="currentColor"
						    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					    ></path>
				    </svg>
				    Creating...
			    </>
		    ) : (
			    "Create Article"
		    )}
	    </button>
    );
};

export default SaveButton;