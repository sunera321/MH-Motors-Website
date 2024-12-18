

const Location = () => {
    return (
        <div>
            <section className="py-16 ">
                <div className="container px-4 mx-auto">
                    <h2 className="mb-12 text-3xl font-bold text-center">Our Location</h2>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.7931361528326!2d80.3632636!3d7.4880793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae33b0007614947%3A0x618c480ae0fdad7e!2sM%20H%20Motors!5e0!3m2!1sen!2slk!4v1734522128892!5m2!1sen!2slk"
                        
                        className='border-2 border-gray-300 w-full h-[400px]'
                       
                        loading="lazy"
                    ></iframe>

                </div>
            </section>
        </div>
    )
}

        export default Location