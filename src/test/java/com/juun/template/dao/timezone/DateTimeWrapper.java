package com.juun.template.dao.timezone;

import java.io.Serializable;
import java.time.*;
import javax.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "jhi_date_time_wrapper")
public class DateTimeWrapper implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "instant")
    private Instant instant;

    @Column(name = "local_date_time")
    private LocalDateTime localDateTime;

    @Column(name = "offset_date_time")
    private OffsetDateTime offsetDateTime;

    @Column(name = "zoned_date_time")
    private ZonedDateTime zonedDateTime;

    @Column(name = "local_time")
    private LocalTime localTime;

    @Column(name = "offset_time")
    private OffsetTime offsetTime;

    @Column(name = "local_date")
    private LocalDate localDate;
}
