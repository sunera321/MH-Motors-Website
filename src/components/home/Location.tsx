import React from 'react'

const Location = () => {
    return (
        <div>
            <section className="py-16 ">
                <div className="container px-4 mx-auto">
                    <h2 className="mb-12 text-3xl font-bold text-center">Our Location</h2>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1510.7319428234482!2d80.35663241349971!3d7.49088599782764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2slk!4v1733130045040!5m2!1sen!2slk"
                      
                        className='border-2 border-gray-300 w-full h-[400px]'
                       
                        loading="lazy"
                    ></iframe>

                </div>
            </section>
        </div>
    )
}

        export default Location