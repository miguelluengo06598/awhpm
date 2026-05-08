import { NextRequest, NextResponse } from 'next/server'

// ═══════════════════════════════════════════════════════════
// API ROUTE: /api/contact
// Preparado para integración con Supabase
// ═══════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // ───────────────────────────────────────────────────────
    // VALIDACIÓN DE CAMPOS OBLIGATORIOS
    // ───────────────────────────────────────────────────────
    const { fullName, email, subject, message } = body

    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Faltan campos obligatorios.' },
        { status: 400 }
      )
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'El formato del email no es válido.' },
        { status: 400 }
      )
    }

    // ───────────────────────────────────────────────────────
    // PAYLOAD NORMALIZADO (misma estructura que envía el cliente)
    // ───────────────────────────────────────────────────────
    const contactPayload = {
      fullName: fullName.toString().trim(),
      email: email.toString().trim().toLowerCase(),
      phone: body.phone?.toString().trim() || null,
      subject: subject.toString(),
      message: message.toString().trim(),
      createdAt: new Date().toISOString(),
      // Campos útiles para Supabase que puedes añadir después:
      // status: 'pending',      // pending | responded | archived
      // source: 'web',          // web | email | referral
      // assignedTo: null,       // UUID del admin asignado
    }

    // ═══════════════════════════════════════════════════════
    // INTEGRACIÓN CON SUPABASE (descomenta cuando esté listo)
    // ═══════════════════════════════════════════════════════
    //
    // 1. Instala el cliente de Supabase:
    //    npm install @supabase/supabase-js
    //
    // 2. Crea un cliente en lib/supabase.ts:
    //    import { createClient } from '@supabase/supabase-js'
    //    export const supabase = createClient(
    //      process.env.NEXT_PUBLIC_SUPABASE_URL!,
    //      process.env.SUPABASE_SERVICE_ROLE_KEY!
    //    )
    //
    // 3. Inserta el registro:
    //    const { data, error } = await supabase
    //      .from('contacts')
    //      .insert([contactPayload])
    //      .select()
    //
    //    if (error) {
    //      console.error('Supabase error:', error)
    //      throw new Error('Error al guardar en la base de datos')
    //    }
    //
    // 4. Opcional: enviar email de notificación con Resend/SendGrid
    //
    // ═══════════════════════════════════════════════════════

    // Simulación de guardado (elimina este bloque cuando conectes Supabase)
    console.log('[API /contact] Payload recibido:', contactPayload)

    // Simular pequeña latencia de red
    await new Promise((resolve) => setTimeout(resolve, 600))

    return NextResponse.json(
      {
        success: true,
        message: 'Mensaje enviado correctamente.',
        data: {
          id: crypto.randomUUID(), // Simulación de ID generado por Supabase
          ...contactPayload,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[API /contact] Error:', error)

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.',
      },
      { status: 500 }
    )
  }
}

// Opcional: endpoint GET para listar contactos (protegido con auth)
export async function GET() {
  // Este endpoint requiere autenticación/admin para acceder a los contactos.
  // Después de conectar Supabase, puedes implementar:
  //
  // const { data, error } = await supabase
  //   .from('contacts')
  //   .select('*')
  //   .order('createdAt', { ascending: false })
  //
  // return NextResponse.json({ success: true, data })

  return NextResponse.json(
    { success: false, message: 'Método no implementado.' },
    { status: 501 }
  )
}
