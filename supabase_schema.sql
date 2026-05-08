-- ═══════════════════════════════════════════════════════════════════════════════
-- AECMI - ESQUEMA COMPLETO DE BASE DE DATOS PARA SUPABASE
-- ═══════════════════════════════════════════════════════════════════════════════
-- Este script crea todas las tablas necesarias para la plataforma AECMI.
-- Es idempotente (usa IF NOT EXISTS) y puede ejecutarse múltiples veces.
-- Recomendación: Ejecutar en Supabase SQL Editor.
-- ═══════════════════════════════════════════════════════════════════════════════

-- Habilitar extensión UUID si no está activa
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═══════════════════════════════════════════════════════════════════════════════
-- TABLA 1: users
-- Almacena los usuarios registrados en la plataforma.
-- Se sincroniza con auth.users de Supabase (trigger recomendado).
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    role VARCHAR(20) NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'client', 'staff')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.users IS 'Usuarios registrados en la plataforma AECMI';
COMMENT ON COLUMN public.users.role IS 'Rol del usuario: admin, client o staff';

-- Índices para búsquedas frecuentes
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON public.users(is_active);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON public.users(created_at);

-- ═══════════════════════════════════════════════════════════════════════════════
-- TABLA 2: certifications (catálogo)
-- Catálogo de certificaciones disponibles en AECMI.
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE CHECK (name IN ('Information_Delivery_Manager', 'BIM_Design_Manager', 'BIM_Construction_Manager')),
    description TEXT,
    fee DECIMAL(10, 2) NOT NULL,
    duration_days INTEGER,
    exam_duration_minutes INTEGER,
    requirements TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.certifications IS 'Catálogo de certificaciones BIM disponibles';

CREATE INDEX IF NOT EXISTS idx_certifications_name ON public.certifications(name);
CREATE INDEX IF NOT EXISTS idx_certifications_is_active ON public.certifications(is_active);

-- ═══════════════════════════════════════════════════════════════════════════════
-- TABLA 3: certifications_applications
-- Solicitudes de certificación realizadas por los usuarios.
-- Contiene todo el flujo: solicitud, revisión, pago, examen, entrevista, emisión.
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.certifications_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Relación con usuario y certificación
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    certification_id UUID NOT NULL REFERENCES public.certifications(id) ON DELETE RESTRICT,

    -- Estado de la solicitud
    status VARCHAR(30) NOT NULL DEFAULT 'pending' 
        CHECK (status IN ('pending', 'in_review', 'approved', 'rejected', 'exam_scheduled', 'exam_passed', 'certified')),

    -- Información profesional del solicitante
    professional_experience TEXT,
    education_details TEXT,
    years_of_experience INTEGER,

    -- Fechas de gestión
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES public.users(id) ON DELETE SET NULL,

    -- Pagos
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
    payment_amount DECIMAL(10, 2),
    payment_date TIMESTAMP WITH TIME ZONE,

    -- Examen
    exam_date DATE,
    exam_time TIME,
    exam_location VARCHAR(255),
    exam_attempts INTEGER DEFAULT 0,
    exam_passed BOOLEAN,
    exam_score INTEGER,

    -- Entrevista
    interview_date DATE,
    interview_time TIME,
    interview_result VARCHAR(20) CHECK (interview_result IN ('pending', 'passed', 'failed')),

    -- Certificación emitida
    certification_issued_date DATE,
    certification_expiry_date DATE,
    certification_code VARCHAR(50) UNIQUE,

    -- Notas administrativas
    admin_notes TEXT,
    rejection_reason TEXT,

    -- Auditoría
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.certifications_applications IS 'Solicitudes de certificación BIM con flujo completo de evaluación';
COMMENT ON COLUMN public.certifications_applications.status IS 'Estado del flujo: pending, in_review, approved, rejected, exam_scheduled, exam_passed, certified';
COMMENT ON COLUMN public.certifications_applications.reviewed_by IS 'Administrador que revisó la solicitud';

-- Índices para optimizar consultas frecuentes
CREATE INDEX IF NOT EXISTS idx_cert_apps_user_id ON public.certifications_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_cert_apps_certification_id ON public.certifications_applications(certification_id);
CREATE INDEX IF NOT EXISTS idx_cert_apps_status ON public.certifications_applications(status);
CREATE INDEX IF NOT EXISTS idx_cert_apps_payment_status ON public.certifications_applications(payment_status);
CREATE INDEX IF NOT EXISTS idx_cert_apps_submitted_at ON public.certifications_applications(submitted_at);
CREATE INDEX IF NOT EXISTS idx_cert_apps_exam_date ON public.certifications_applications(exam_date);
CREATE INDEX IF NOT EXISTS idx_cert_apps_reviewed_by ON public.certifications_applications(reviewed_by);
CREATE INDEX IF NOT EXISTS idx_cert_apps_cert_code ON public.certifications_applications(certification_code);

-- ═══════════════════════════════════════════════════════════════════════════════
-- TABLA 4: documents
-- Documentos adjuntos a una solicitud de certificación.
-- Los archivos físicos se almacenan en Supabase Storage; aquí solo la metadata.
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES public.certifications_applications(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    document_type VARCHAR(30) NOT NULL DEFAULT 'other' 
        CHECK (document_type IN ('cv', 'education', 'experience', 'portfolio', 'other')),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.documents IS 'Documentos subidos por los candidatos (CV, títulos, portfolio, etc.)';
COMMENT ON COLUMN public.documents.file_url IS 'URL pública o signed URL del archivo en Supabase Storage';

CREATE INDEX IF NOT EXISTS idx_documents_application_id ON public.documents(application_id);
CREATE INDEX IF NOT EXISTS idx_documents_document_type ON public.documents(document_type);

-- ═══════════════════════════════════════════════════════════════════════════════
-- TABLA 5: payments
-- Registro de pagos asociados a solicitudes de certificación.
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES public.certifications_applications(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
    payment_method VARCHAR(20) CHECK (payment_method IN ('card', 'transfer')),
    transaction_id VARCHAR(255),
    stripe_payment_intent_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.payments IS 'Pagos realizados por los candidatos para sus solicitudes';
COMMENT ON COLUMN public.payments.stripe_payment_intent_id IS 'ID del PaymentIntent de Stripe (opcional)';

CREATE INDEX IF NOT EXISTS idx_payments_application_id ON public.payments(application_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_transaction_id ON public.payments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON public.payments(created_at);

-- ═══════════════════════════════════════════════════════════════════════════════
-- TABLA 6: contact_messages
-- Mensajes recibidos desde el formulario de contacto público.
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
    response TEXT,
    responded_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    responded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.contact_messages IS 'Mensajes enviados desde el formulario de contacto de la web';
COMMENT ON COLUMN public.contact_messages.status IS 'Estado del mensaje: new, read, responded';

CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON public.contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_responded_by ON public.contact_messages(responded_by);

-- ═══════════════════════════════════════════════════════════════════════════════
-- FUNCIÓN: actualizar updated_at automáticamente
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para users
DROP TRIGGER IF EXISTS trg_users_updated_at ON public.users;
CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger para certifications_applications
DROP TRIGGER IF EXISTS trg_cert_apps_updated_at ON public.certifications_applications;
CREATE TRIGGER trg_cert_apps_updated_at
    BEFORE UPDATE ON public.certifications_applications
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- ═══════════════════════════════════════════════════════════════════════════════
-- DATOS INICIALES: Certificaciones disponibles
-- ═══════════════════════════════════════════════════════════════════════════════
INSERT INTO public.certifications (name, description, fee, duration_days, exam_duration_minutes, requirements, is_active)
VALUES 
    (
        'Information_Delivery_Manager',
        'Especialista en gestión estratégica de información en proyectos BIM. Gestión de procesos, protocolos de información, CDE y cumplimiento ISO 19650.',
        450.00,
        90,
        120,
        'Experiencia mínima de 3 años en gestión de información BIM. Conocimiento de estándares ISO 19650.',
        TRUE
    ),
    (
        'BIM_Design_Manager',
        'Coordinador de procesos BIM en fase de diseño. Coordinación interdisciplinar, auditoría de modelos y gestión de incidencias.',
        450.00,
        90,
        120,
        'Experiencia mínima de 3 años en coordinación BIM de diseño. Dominio de herramientas de modelado federado.',
        TRUE
    ),
    (
        'BIM_Construction_Manager',
        'Especialista en implantación BIM en fase de construcción. Coordinación en obra, control de calidad y gestión documental.',
        450.00,
        90,
        120,
        'Experiencia mínima de 3 años en gestión BIM en obra. Conocimiento de planificación 4D/5D y BEP.',
        TRUE
    )
ON CONFLICT (name) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS) - Políticas básicas
-- Nota: Habilitar RLS manualmente en Supabase si se desea.
-- ═══════════════════════════════════════════════════════════════════════════════

-- Política: usuarios solo ven sus propios datos (ejemplo base)
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.certifications_applications ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Ejemplo de política (descomentar y adaptar según necesidad):
-- CREATE POLICY "Users can view own profile" ON public.users
--     FOR SELECT USING (auth.uid() = id);

-- CREATE POLICY "Users can view own applications" ON public.certifications_applications
--     FOR SELECT USING (auth.uid() = user_id);

-- CREATE POLICY "Admins can view all applications" ON public.certifications_applications
--     FOR SELECT USING (
--         EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
--     );

-- ═══════════════════════════════════════════════════════════════════════════════
-- FIN DEL ESQUEMA
-- ═══════════════════════════════════════════════════════════════════════════════
