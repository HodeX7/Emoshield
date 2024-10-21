import {AnimatedBeamMultipleOutputDemo} from "@/components/ui/AnimatedBeam";
import FlickeringGrid from "@/components/ui/flickering-grid";
import Form from "@/components/Form";


export default function Home() {
    return (
        <div className='flex flex-col w-full h-full'>
                <FlickeringGrid
                    className="z-0 absolute inset-0 size-full"
                    squareSize={4}
                    gridGap={6}
                    color="#6B7280"
                    maxOpacity={0.3}
                    flickerChance={0.1}
                />
            <h1 className='font-display mt-24 text-center text-2xl font-bold tracking-[-0.02em] bg-gradient-to-r from-green-300 to-blue-500 inline-block bg-clip-text text-transparent drop-shadow-sm dark:text-transparent md:text-5xl md:leading-[5rem]'>Pitstop
                Solution For All Your Passwords
            </h1>
            <div className='flex items-center flex-col lg:flex-row'>
                <div className="w-full lg:w-1/2">
                    <AnimatedBeamMultipleOutputDemo/>
                </div>
                <div className="w-1/2 h-full mt-10 mr-12">
                    <Form />
                </div>
            </div>
        </div>
    );
}
