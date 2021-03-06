package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.Note;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Note entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {}
