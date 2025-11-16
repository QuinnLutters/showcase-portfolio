export default function Navbar() {
    return (
        <nav className="fixed top-6 left-0 right-0 z-50 px-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                
                {/* Logo on the left */}
                <a href="/" className="flex items-center h-[52px]">
                    <img 
                        src="/assets/Logo_QA_black.svg" 
                        alt="Logo" 
                        className="h-[40px] w-auto"
                    />
                </a>

                {/* Menu bar in the middle */}
                <div style={{
                    height: '50px',
                    paddingLeft: '22.50px',
                    paddingRight: '22.50px',
                    paddingTop: '11.50px',
                    paddingBottom: '11.50px',
                    background: 'linear-gradient(136deg, rgba(0, 0, 0, 0.10) 0%, rgba(102, 102, 102, 0.10) 15%, rgba(0, 0, 0, 0.08) 29%, rgba(102, 102, 102, 0.08) 43%, rgba(0, 0, 0, 0.10) 68%, rgba(102, 102, 102, 0.10) 81%, rgba(0, 0, 0, 0.10) 100%)',
                    borderRadius: '22px',
                    outline: '1px rgba(0, 0, 0, 0.20) solid',
                    outlineOffset: '-1px',
                    backdropFilter: 'blur(5px)',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '350px',
                    display: 'inline-flex'
                }}>
                    <div style={{
                        color: 'black',
                        fontSize: '15px',
                        fontWeight: 500,
                        textTransform: 'uppercase'
                    }}>
                        MENU
                    </div>
                    <button className="hover:opacity-70 transition-opacity">
                        <img 
                            src="/assets/menu.svg" 
                            alt="Menu" 
                            style={{ width: '24px', height: '24px' }}
                        />
                    </button>
                </div>

                {/* Send button on the right - 56x56px container */}
                <a href="mailto:quinn.lutters@gmail.com">
                    <div style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(136deg, rgba(0, 0, 0, 0.10) 0%, rgba(102, 102, 102, 0.10) 15%, rgba(0, 0, 0, 0.08) 29%, rgba(102, 102, 102, 0.08) 43%, rgba(0, 0, 0, 0.10) 68%, rgba(102, 102, 102, 0.10) 81%, rgba(0, 0, 0, 0.10) 100%)',
                        borderRadius: '22px',
                        outline: '1px rgba(0, 0, 0, 0.20) solid',
                        outlineOffset: '-1px',
                        backdropFilter: 'blur(5px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                    >
                        <img 
                            src="/assets/send.svg" 
                            alt="Contact" 
                            style={{ width: '24px', height: '24px' }}
                        />
                    </div>
                </a>
            </div>
        </nav>
    )
}