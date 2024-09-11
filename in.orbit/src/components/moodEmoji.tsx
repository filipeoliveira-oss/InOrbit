import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

export default function MoodEmoji({ emoji }: { emoji: React.ReactElement }) {
    return (
        <Canvas style={{ height: '100%' }}>
            <ambientLight />
            <OrbitControls enableZoom={false} />
            <Suspense fallback={null}>
                {emoji}
            </Suspense>
            <Environment preset="sunset" />
        </Canvas>
    )
}